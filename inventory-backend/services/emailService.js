import nodemailer from 'nodemailer';
// import sgMail from '@sendgrid/mail';
import pool from '../db.js';

// // Configure SendGrid (production)
// if (process.env.SENDGRID_API_KEY) {
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// }

// Configure Nodemailer (development/testing)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

// Send a single email
export const sendEmail = async ({ to, from, subject, html, text }) => {
  try {
    // // Use SendGrid if API key is provided
    // if (process.env.SENDGRID_API_KEY) {
    //   const msg = {
    //     to,
    //     from: from || process.env.FROM_EMAIL,
    //     subject,
    //     html,
    //     text: text || html.replace(/<[^>]*>/g, '')
    //   };
    //   await sgMail.send(msg);
    //   console.log(`Email sent via SendGrid to ${to}`);
    //   return { success: true, provider: 'sendgrid' };
    // }

    // Nodemailer fallback
    const info = await transporter.sendMail({
      from: from || process.env.FROM_EMAIL,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, '')
    });
    console.log(`Email sent via Nodemailer to ${to}: ${info.messageId}`);
    return { success: true, provider: 'nodemailer', messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Send multiple emails in bulk
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

// Send email using a template
export const sendTemplateEmail = async (templateName, to, variables) => {
  try {
    const [templates] = await pool.execute(
      'SELECT * FROM email_templates WHERE type = ? AND is_active = TRUE',
      [templateName]
    );

    if (templates.length === 0) {
      throw new Error(`Template ${templateName} not found`);
    }

    const template = templates[0];
    let subject = template.subject;
    let body = template.body;

    // Replace variables in template
    for (const [key, value] of Object.entries(variables)) {
      subject = subject.replace(new RegExp(`{${key}}`, 'g'), value);
      body = body.replace(new RegExp(`{${key}}`, 'g'), value);
    }

    return await sendEmail({ to, subject, html: body });
  } catch (error) {
    console.error('Error sending template email:', error);
    throw error;
  }
};
