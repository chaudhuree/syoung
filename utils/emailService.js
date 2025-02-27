const nodemailer = require('nodemailer');
const { contactFormTemplate } = require('./emailTemplates');

// Create a transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send contact form email
const sendContactFormEmail = async (contactData) => {
  try {
    const transporter = createTransporter();
    
    // Email options
    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: 'New Contact Form Submission',
      html: contactFormTemplate(contactData)
    };
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = {
  sendContactFormEmail
};
