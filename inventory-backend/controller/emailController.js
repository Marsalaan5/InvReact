import pool from "../db.js";
import { DateTime } from "luxon";
import Joi from "joi";
import { do_ma_query } from "../db.js";
import { sendEmail } from "../services/emailService.js";
import { 
  getNotifications as getNotificationsService,
  createNotification as createNotificationService,
  createNotificationByEmail as createNotificationByEmailService,
  markAsRead as markAsReadService,
  markAllAsRead as markAllAsReadService
} from "../services/notificationService.js";


const buildEmailQuery = ({ category, userId, userEmail, search }) => {
  const categoryMap = {
    inbox: {
      clause: 'recipient_email = ? AND status != "trash"',
      params: [userEmail],
    },
    sent: {
      clause: 'sender_id = ? AND status = "sent"',
      params: [userId],
    },
    starred: {
      clause:
        '(sender_id = ? OR recipient_email = ?) AND is_starred = TRUE AND status != "trash"',
      params: [userId, userEmail],
    },
    drafts: {
      clause: 'sender_id = ? AND status = "draft"',
      params: [userId],
    },
    trash: {
      clause: '(sender_id = ? OR recipient_email = ?) AND status = "trash"',
      params: [userId, userEmail],
    },
  };

  const categoryData = categoryMap[category];
  if (!categoryData) return null;

  let { clause, params } = categoryData;

  // Full text search
  if (search) {
    clause +=
      " AND MATCH(subject, body, sender_email, recipient_email) AGAINST(? IN BOOLEAN MODE)";
    params.push(`${search}*`);
  }

  return { clause, params };
};

export const getEmails = async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10, search = "", lastCreatedAt } = req.query;
    const userId = req.user.id;
    const userEmail = req.user.email;

    let offset = (page - 1) * limit;
    let keysetFilter = "";
    const queryData = buildEmailQuery({ category, userId, userEmail, search });

    if (!queryData) {
      return res.status(400).json({
        success: false,
        message: "Invalid category",
        timestamp: DateTime.local().toISO(),
      });
    }

    let { clause, params } = queryData;

    // Keyset pagination for large mailboxes
    if (lastCreatedAt) {
      keysetFilter = " AND created_at < ?";
      params.push(lastCreatedAt);
      offset = 0; // offset is not used with keyset pagination
    }

    const query = `
      SELECT * FROM emails
      WHERE ${clause} ${keysetFilter}
      ORDER BY created_at DESC
      LIMIT ?
    `;

    const countQuery = `SELECT COUNT(*) as total FROM emails WHERE ${clause}`;

    const emails = await do_ma_query(query, [...params, parseInt(limit)]);
    const countResult = await do_ma_query(countQuery, params);
    const total = countResult[0].total;

    res.status(200).json({
      success: true,
      data: emails,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
        lastCreatedAt: emails.length
          ? emails[emails.length - 1].created_at
          : null,
      },
      timestamp: DateTime.local().toISO(),
    });
  } catch (error) {
    console.error(`[Email Fetch Error] ${error.stack}`);
    res.status(500).json({
      success: false,
      message: "Error fetching emails",
      error: error.message,
      timestamp: DateTime.local().toISO(),
    });
  }
};

// GET single email by ID
export const getEmailById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userEmail = req.user.email;

    const emails = await do_ma_query(
      `SELECT * FROM emails 
       WHERE id = ?
         AND (sender_id = ? OR recipient_email = ?)`,
      [id, userId, userEmail]
    );

    if (emails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Email not found or access denied",
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
      });
    }

    res.status(200).json({
      success: true,
      data: emails[0],
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  } catch (error) {
    console.error("Error fetching email:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching email",
      error: error.message,
    });
  }
};

// POST send email
export const sendEmails = async (req, res) => {
  try {
    const emailSchema = Joi.object({
      to: Joi.string().email().required().label("recipient email"),
      subject: Joi.string().min(1).max(500).required().label("subject"),
      body: Joi.string().required().label("body"),
      template: Joi.string().max(100).allow("", null).label("template"),
      enableFollowUp: Joi.boolean().default(false).label("enable follow-up"),
      followUpDays: Joi.number()
        .integer()
        .min(1)
        .max(30)
        .default(2)
        .label("follow-up days"),
      enableEscalation: Joi.boolean().default(false).label("enable escalation"),
      escalationEmail: Joi.string()
        .email()
        .allow("", null)
        .label("escalation email"),
    });

    const { error, value } = emailSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
      });
    }

    const userId = req.user.id;
    const userEmail = req.user.email;

    // Insert email into database
    const result = await do_ma_query(
      `INSERT INTO emails (
        sender_id, sender_email, recipient_email, subject, body, 
        status, follow_up_scheduled, follow_up_days, 
        escalation_enabled, escalation_email, template_type
      ) VALUES (?, ?, ?, ?, ?, 'sent', ?, ?, ?, ?, ?)`,
      [
        userId,
        userEmail,
        value.to,
        value.subject,
        value.body,
        value.enableFollowUp,
        value.followUpDays,
        value.enableEscalation,
        value.escalationEmail || null,
        value.template || "none",
      ]
    );

    const emailId = result.insertId;

    // Send actual email
    await sendEmail({
      to: value.to,
      from: userEmail,
      subject: value.subject,
      html: value.body,
    });

    // Track email sent event
    await do_ma_query(
      "INSERT INTO email_tracking (email_id, event_type, event_data) VALUES (?, ?, ?)",
      [emailId, "sent", JSON.stringify({ timestamp: new Date() })]
    );

    // Create notification for recipient
    await createNotification({
      userEmail: value.to,
      emailId,
      type: "new_email",
      title: "New Email",
      message: `You have a new email from ${userEmail}`,
    });

    res.status(201).json({
      success: true,
      message: "Email sent successfully",
      data: {
        emailId,
        followUpScheduled: value.enableFollowUp,
        escalationEnabled: value.enableEscalation,
      },
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Error sending email",
      error: error.message,
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  }
};

// PUT mark email as read
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userEmail = req.user.email;

    const result = await do_ma_query(
      `UPDATE emails 
       SET is_read = TRUE 
       WHERE id = ?
         AND (sender_id = ? OR recipient_email = ?)`,
      [id, userId, userEmail]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Email not found or access denied",
      });
    }

    res.status(200).json({
      success: true,
      message: "Email marked as read",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating email",
    });
  }
};

// PUT toggle star

export const toggleStar = async (req, res) => {
  try {
    const { id } = req.params;
    const { starred } = req.body;
    const userId = req.user.id;
    const userEmail = req.user.email;

    const result = await do_ma_query(
      `UPDATE emails 
       SET is_starred = ? 
       WHERE id = ?
         AND (sender_id = ? OR recipient_email = ?)`,
      [starred, id, userId, userEmail]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Email not found or access denied",
      });
    }

    res.status(200).json({
      success: true,
      message: "Star updated",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating email",
    });
  }
};

// DELETE email
export const deleteEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userEmail = req.user.email;

    const result = await do_ma_query(
      `UPDATE emails 
       SET status = 'trash'
       WHERE id = ?
         AND (sender_id = ? OR recipient_email = ?)`,
      [id, userId, userEmail]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Email not found or access denied",
      });
    }

    res.status(200).json({
      success: true,
      message: "Email moved to trash",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error deleting email",
    });
  }
};

// POST bulk actions
export const bulkAction = async (req, res) => {
  try {
    const { action } = req.params;
    const { emailIds } = req.body;

    if (!emailIds || emailIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No emails selected",
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
      });
    }

    const placeholders = emailIds.map(() => "?").join(",");
    const userId = req.user.id;
    const userEmail = req.user.email;

    switch (action) {
      case "read":
        await do_ma_query(
          `UPDATE emails 
           SET is_read = TRUE 
           WHERE id IN (${placeholders}) 
             AND (sender_id = ? OR recipient_email = ?)`,
          [...emailIds, userId, userEmail]
        );
        break;

      case "unread":
        await do_ma_query(
          `UPDATE emails 
           SET is_read = FALSE 
           WHERE id IN (${placeholders}) 
             AND (sender_id = ? OR recipient_email = ?)`,
          [...emailIds, userId, userEmail]
        );
        break;

      case "delete":
        await do_ma_query(
          `UPDATE emails 
           SET status = 'trash'
           WHERE id IN (${placeholders})
             AND (sender_id = ? OR recipient_email = ?)`,
          [...emailIds, userId, userEmail]
        );
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid action",
          timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        });
    }

    res.status(200).json({
      success: true,
      message: `Bulk ${action} completed successfully`,
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  } catch (error) {
    console.error("Error performing bulk action:", error);
    res.status(500).json({
      success: false,
      message: "Error performing bulk action",
      error: error.message,
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  }
};

// GET templates
export const getTemplates = async (req, res) => {
  try {
    const templates = await do_ma_query(
      "SELECT * FROM email_templates WHERE is_active = TRUE ORDER BY name"
    );

    res.status(200).json({
      success: true,
      data: templates,
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  } catch (error) {
    console.error("Error fetching templates:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching templates",
      error: error.message,
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  }
};





//nNotification Controller



// GET notifications for current user
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 20 } = req.query;

    const notifications = await getNotificationsService(userId, parseInt(limit));

    res.status(200).json({
      success: true,
      data: notifications,
      timestamp: DateTime.local().toISO(),
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching notifications",
      error: error.message,
      timestamp: DateTime.local().toISO(),
    });
  }
};

// POST create notification
export const createNotification = async (req, res) => {
  try {
    const { userId, emailId, type, title, message } = req.body;

    await createNotificationService({
      userId,
      emailId,
      type,
      title,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      timestamp: DateTime.local().toISO(),
    });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({
      success: false,
      message: "Error creating notification",
      error: error.message,
      timestamp: DateTime.local().toISO(),
    });
  }
};

// POST create notification by email
export const createNotificationByEmail = async (req, res) => {
  try {
    const { userEmail, emailId, type, title, message } = req.body;

    await createNotificationByEmailService({
      userEmail,
      emailId,
      type,
      title,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      timestamp: DateTime.local().toISO(),
    });
  } catch (error) {
    console.error("Error creating notification by email:", error);
    res.status(500).json({
      success: false,
      message: "Error creating notification",
      error: error.message,
      timestamp: DateTime.local().toISO(),
    });
  }
};

// PUT mark notification as read
export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    await markAsReadService(id);

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      timestamp: DateTime.local().toISO(),
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({
      success: false,
      message: "Error updating notification",
      error: error.message,
      timestamp: DateTime.local().toISO(),
    });
  }
};

// PUT mark all notifications as read
export const markAllNotificationsAsRead = async (req, res) => {
  try {
    const userId = req.user.id;

    await markAllAsReadService(userId);

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
      timestamp: DateTime.local().toISO(),
    });
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    res.status(500).json({
      success: false,
      message: "Error updating notifications",
      error: error.message,
      timestamp: DateTime.local().toISO(),
    });
  }
};

// DELETE notification
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await pool.execute(
      'DELETE FROM notifications WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (result[0].affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Notification not found or access denied",
        timestamp: DateTime.local().toISO(),
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
      timestamp: DateTime.local().toISO(),
    });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting notification",
      error: error.message,
      timestamp: DateTime.local().toISO(),
    });
  }
};
