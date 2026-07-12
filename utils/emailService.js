import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendContactNotification = async (submissionData) => {
    const { name, email, phone, company, subject, message } = submissionData;
    const destinationEmail = process.env.NOTIFICATION_EMAIL || 'info@revotechnologies.ug';

    const mailOptions = {
        from: `"${name}" <${process.env.SMTP_USER}>`,
        to: destinationEmail,
        replyTo: email,
        subject: `Contact Form: ${subject}`,
        text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Company: ${company || 'N/A'}
Subject: ${subject}

Message:
${message}
        `,
        html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Company:</strong> ${company || 'N/A'}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <br>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Notification email sent: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending notification email:', error);
        return false;
    }
};

export const sendNewsletterConfirmation = async (email, name) => {
    const mailOptions = {
        from: `"Revo Technologies" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Newsletter Subscription Confirmed',
        text: `Hi ${name || ''},\n\nThank you for subscribing to our newsletter! You'll now receive updates and insights from Revo Technologies Uganda.`,
        html: `
            <h3>Subscription Confirmed</h3>
            <p>Hi ${name || ''},</p>
            <p>Thank you for subscribing to our newsletter! You'll now receive updates and insights from <strong>Revo Technologies Uganda</strong>.</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending newsletter confirmation:', error);
        return false;
    }
};
