// import nodemailer from 'nodemailer';
// // import sgMail from '@sendgrid/mail';
// import pool from '../db.js';

// // // Configure SendGrid (production)
// // if (process.env.SENDGRID_API_KEY) {
// //   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// // }

// // Configure Nodemailer (development/testing)
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST || 'smtp.gmail.com',
//   port: process.env.SMTP_PORT || 587,
//   secure: false,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD
//   }
// });

// // Send a single email
// // export const sendEmail = async ({ to, from, subject, html, text }) => {
// //   try {
// //     // // Use SendGrid if API key is provided
// //     // if (process.env.SENDGRID_API_KEY) {
// //     //   const msg = {
// //     //     to,
// //     //     from: from || process.env.FROM_EMAIL,
// //     //     subject,
// //     //     html,
// //     //     text: text || html.replace(/<[^>]*>/g, '')
// //     //   };
// //     //   await sgMail.send(msg);
// //     //   console.log(`Email sent via SendGrid to ${to}`);
// //     //   return { success: true, provider: 'sendgrid' };
// //     // }

// //     // Nodemailer fallback
// //     const info = await transporter.sendMail({
// //       from: from || process.env.FROM_EMAIL,
// //       to,
// //       subject,
// //       html,
// //       text: text || html.replace(/<[^>]*>/g, '')
// //     });
// //     console.log(`Email sent via Nodemailer to ${to}: ${info.messageId}`);
// //     return { success: true, provider: 'nodemailer', messageId: info.messageId };
// //   } catch (error) {
// //     console.error('Error sending email:', error);
// //     throw error;
// //   }
// // };


// export const sendEmail = async ({ to, from, subject, html, text }) => {
//   const mailOptions = {
//     from: from || process.env.FROM_EMAIL,
//     to,
//     subject,
//     html,
//     text: text || htmlToText(html)
//   };

//   const info = await transporter.sendMail(mailOptions);
//   return {
//     success: true,
//     provider: 'nodemailer',
//     messageId: info.messageId
//   };
// };


// // Send multiple emails in bulk
// export const sendBulkEmails = async (emails) => {
//   const results = [];
//   for (const email of emails) {
//     try {
//       const result = await sendEmail(email);
//       results.push({ email: email.to, success: true, result });
//     } catch (error) {
//       results.push({ email: email.to, success: false, error: error.message });
//     }
//   }
//   return results;
// };

// // Send email using a template
// export const sendTemplateEmail = async (templateName, to, variables) => {
//   try {
//     const [templates] = await pool.execute(
//       'SELECT * FROM email_templates WHERE type = ? AND is_active = TRUE',
//       [templateName]
//     );

//     if (templates.length === 0) {
//       throw new Error(`Template ${templateName} not found`);
//     }

//     const template = templates[0];
//     let subject = template.subject;
//     let body = template.body;

//     // Replace variables in template
//     for (const [key, value] of Object.entries(variables)) {
//       subject = subject.replace(new RegExp(`{${key}}`, 'g'), value);
//       body = body.replace(new RegExp(`{${key}}`, 'g'), value);
//     }

//     return await sendEmail({ to, subject, html: body });
//   } catch (error) {
//     console.error('Error sending template email:', error);
//     throw error;
//   }
// };



// // emailService.js
// import nodemailer from 'nodemailer';
// import pool from '../db.js';
// import { do_ma_query } from '../db.js';

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST || 'smtp.gmail.com',
//   port: process.env.SMTP_PORT || 587,
//   secure: false,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD
//   }
// });

// // Existing sendEmail function
// export const sendEmail = async ({ to, from, subject, html, text }) => {
//   const mailOptions = {
//     from: from || process.env.FROM_EMAIL,
//     to,
//     subject,
//     html,
//     text: text || html.replace(/<[^>]*>/g, '')
//   };

//   const info = await transporter.sendMail(mailOptions);
//   return {
//     success: true,
//     provider: 'nodemailer',
//     messageId: info.messageId
//   };
// };

// // NEW: Send template email AND store in database
// export const sendTemplateEmail = async (templateName, to, variables, customSubject = null) => {
//   try {
//     // Get template from database
//     const templates = await do_ma_query(
//       'SELECT * FROM email_templates WHERE type = ? AND is_active = TRUE',
//       [templateName]
//     );

//     if (templates.length === 0) {
//       throw new Error(`Template ${templateName} not found`);
//     }

//     const template = templates[0];
//     // let subject = customSubject || template.subject;
//     let subject = String(customSubject || template.subject || 'No Subject');

//     let body = template.body;

//     // Replace variables in template
//     for (const [key, value] of Object.entries(variables)) {
//       subject = subject.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
//       body = body.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
//     }

//     // Send physical email
//     await sendEmail({ 
//       to, 
//       from: process.env.FROM_EMAIL,
//       subject, 
//       html: body 
//     });

//     // Store in emails table so it appears in Email.jsx inbox
//     const emailInsertResult = await do_ma_query(
//       `INSERT INTO emails (
//         sender_id, 
//         sender_email, 
//         recipient_email, 
//         subject, 
//         body, 
//         status, 
//         template_type, 
//         is_read,
//         created_at
//       ) VALUES (?, ?, ?, ?, ?, 'sent', ?, 0, NOW())`,
//       [
//         1, // System/Super Admin ID (you can make this dynamic)
//         process.env.FROM_EMAIL,
//         to,
//         subject,
//         body,
//         templateName
//       ]
//     );

//     console.log(`Email sent and stored in database (ID: ${emailInsertResult.insertId}) for ${to}`);

//     //Create notification for recipient
//     try {
//       // Get recipient user ID by email
//       const recipientUser = await do_ma_query(
//         'SELECT id FROM users WHERE email_1 = ? OR email = ?',
//         [to, to]
//       );

//       if (recipientUser.length > 0) {
//         await do_ma_query(
//           `INSERT INTO notifications (
//             user_id, 
//             email_id, 
//             type, 
//             title, 
//             message, 
//             is_read,
//             created_at
//           ) VALUES (?, ?, 'new_email', ?, ?, 0, NOW())`,
//           [
//             recipientUser[0].id,
//             emailInsertResult.insertId,
//             subject,
//             `You have a new email: ${subject}`
//           ]
//         );
//         console.log(`✅ Notification created for user ${recipientUser[0].id}`);
//       }
//     } catch (notifError) {
//       console.error('⚠️ Failed to create notification:', notifError.message);
//       // Don't throw - email was sent successfully
//     }

//     return { 
//       success: true, 
//       emailId: emailInsertResult.insertId 
//     };

//   } catch (error) {
//     console.error('Error sending template email:', error);
//     throw error;
//   }
// };

// // Existing sendBulkEmails function
// export const sendBulkEmails = async (emails) => {
//   const results = [];
//   for (const email of emails) {
//     try {
//       const result = await sendEmail(email);
//       results.push({ email: email.to, success: true, result });
//     } catch (error) {
//       results.push({ email: email.to, success: false, error: error.message });
//     }
//   }
//   return results;
// };  



import nodemailer from 'nodemailer';
import pool from '../db.js';
import { do_ma_query } from '../db.js';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

// Existing sendEmail function
export const sendEmail = async ({ to, from, subject, html, text }) => {
  const mailOptions = {
    from: from || process.env.FROM_EMAIL,
    to,
    subject,
    html,
    text: text || html.replace(/<[^>]*>/g, '')
  };
  
  const info = await transporter.sendMail(mailOptions);
  
  return {
    success: true,
    provider: 'nodemailer',
    messageId: info.messageId
  };
};


export const sendTemplateEmail = async (
  templateName, 
  to, 
  variables, 
  customSubject = null,
  senderInfo = null
) => {
  try {
    // Get template from database
    const templates = await do_ma_query(
      'SELECT * FROM email_templates WHERE type = ? AND is_active = TRUE',
      [templateName]
    );
    
    if (templates.length === 0) {
      throw new Error(`Template ${templateName} not found`);
    }
    
    const template = templates[0];

    let subject = String(customSubject || template.subject || 'No Subject');
    let body = template.body;
    
    
    for (const [key, value] of Object.entries(variables)) {
      const stringValue = String(value || '');
      subject = subject.replace(new RegExp(`\\{${key}\\}`, 'g'), stringValue);
      body = body.replace(new RegExp(`\\{${key}\\}`, 'g'), stringValue);
    }
    
    // Determine sender information
    const senderId = senderInfo?.senderId || 1;
    const senderEmail = senderInfo?.senderEmail || process.env.FROM_EMAIL;
    const senderName = senderInfo?.senderName || 'System';
    
    // Send physical email
    await sendEmail({ 
      to, 
      from: senderEmail,
      subject, 
      html: body 
    });
    
    // Store in emails table so it appears in Email.jsx inbox
    const emailInsertResult = await do_ma_query(
      `INSERT INTO emails (
        sender_id, 
        sender_email, 
        recipient_email, 
        subject, 
        body, 
        status, 
        template_type, 
        is_read,
        created_at
      ) VALUES (?, ?, ?, ?, ?, 'sent', ?, 0, NOW())`,
      [
        senderId,
        senderEmail,
        to,
        subject,
        body,
        templateName
      ]
    );
    
    console.log(`Email sent and stored in database (ID: ${emailInsertResult.insertId}) for ${to}`);
    
    // Create notification for recipient
    try {
      // Get recipient user ID by email
      const recipientUser = await do_ma_query(
        'SELECT id FROM users WHERE email = ? ',
        [to, to]
      );
      
      if (recipientUser.length > 0) {
        await do_ma_query(
          `INSERT INTO notifications (
            user_id, 
            email_id, 
            type, 
            title, 
            message, 
            is_read,
            created_at
          ) VALUES (?, ?, 'new_email', ?, ?, 0, NOW())`,
          [
            recipientUser[0].id,
            emailInsertResult.insertId,
            subject,
            `You have a new email: ${subject}`
          ]
        );
        console.log(` Notification created for user ${recipientUser[0].id}`);
      }
    } catch (notifError) {
      console.error(' Failed to create notification:', notifError.message);
      // Don't throw - email was sent successfully
    }
    
    return { 
      success: true, 
      emailId: emailInsertResult.insertId 
    };
  } catch (error) {
    console.error('Error sending template email:', error);
    throw error;
  }
};

// Existing sendBulkEmails function
export const sendBulkEmails = async (emails) => {
  const results = [];
  
  for (const email of emails) {
    try {
      const result = await sendEmail(email);
      results.push({ email: email.to, success: true, result });
    } catch (error) {
      results.push({ email: email.to, success: false, error: error.message });
    }
  }
  
  return results;
};



//sendGrid for production


// // emailService.js
// import sgMail from '@sendgrid/mail';
// import { do_ma_query } from '../db.js';
// import pool from '../db.js';

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// // Generic sendEmail function
// export const sendEmail = async ({ to, from, subject, html, text }) => {
//   try {
//     const msg = {
//       to,
//       from: from || process.env.FROM_EMAIL,
//       subject,
//       html,
//       text: text || html.replace(/<[^>]*>/g, ''),
//     };

//     const info = await sgMail.send(msg);

//     return {
//       success: true,
//       provider: 'sendgrid',
//       messageId: info[0]?.headers['x-message-id'] || null,
//     };
//   } catch (error) {
//     console.error('Error sending email via SendGrid:', error.response?.body || error.message);
//     throw error;
//   }
// };

// // Send template email AND store in database
// export const sendTemplateEmail = async (templateName, to, variables, customSubject = null) => {
//   try {
//     // Get template from database
//     const templates = await do_ma_query(
//       'SELECT * FROM email_templates WHERE type = ? AND is_active = TRUE',
//       [templateName]
//     );

//     if (templates.length === 0) {
//       throw new Error(`Template ${templateName} not found`);
//     }

//     const template = templates[0];
//     let subject = customSubject || template.subject;
//     let body = template.body;

//     // Replace variables in template
//     for (const [key, value] of Object.entries(variables)) {
//       subject = subject.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
//       body = body.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
//     }

//     // Send physical email via SendGrid
//     await sendEmail({
//       to,
//       from: process.env.FROM_EMAIL,
//       subject,
//       html: body,
//     });

//     // Store in database
//     const emailInsertResult = await do_ma_query(
//       `INSERT INTO emails (
//         sender_id, 
//         sender_email, 
//         recipient_email, 
//         subject, 
//         body, 
//         status, 
//         template_type, 
//         is_read,
//         created_at
//       ) VALUES (?, ?, ?, ?, ?, 'sent', ?, 0, NOW())`,
//       [
//         1, // system/admin ID
//         process.env.FROM_EMAIL,
//         to,
//         subject,
//         body,
//         templateName,
//       ]
//     );

//     console.log(`Email sent and stored (ID: ${emailInsertResult.insertId}) for ${to}`);

//     // Create notification for recipient
//     try {
//       const recipientUser = await do_ma_query(
//         'SELECT id FROM users WHERE email_1 = ? OR email = ?',
//         [to, to]
//       );

//       if (recipientUser.length > 0) {
//         await do_ma_query(
//           `INSERT INTO notifications (
//             user_id, 
//             email_id, 
//             type, 
//             title, 
//             message, 
//             is_read,
//             created_at
//           ) VALUES (?, ?, 'new_email', ?, ?, 0, NOW())`,
//           [
//             recipientUser[0].id,
//             emailInsertResult.insertId,
//             subject,
//             `You have a new email: ${subject}`,
//           ]
//         );
//         console.log(`Notification created for user ${recipientUser[0].id}`);
//       }
//     } catch (notifError) {
//       console.error('Failed to create notification:', notifError.message);
//     }

//     return { success: true, emailId: emailInsertResult.insertId };
//   } catch (error) {
//     console.error('Error sending template email:', error);
//     throw error;
//   }
// };

// // Bulk emails (parallel sending)
// export const sendBulkEmails = async (emails) => {
//   const results = await Promise.allSettled(
//     emails.map(email => sendEmail(email))
//   );

//   return results.map((res, i) => ({
//     email: emails[i].to,
//     success: res.status === 'fulfilled',
//     result: res.status === 'fulfilled' ? res.value : res.reason.message,
//   }));
// };










