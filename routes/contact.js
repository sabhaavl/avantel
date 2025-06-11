const nodemailer = require('nodemailer');

async function sendMail() {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sabha@simply.science', // Your Google Workspace email address
                pass: 'qzwz kofn oalc hyie', // <--- USE THE GENERATED APP PASSWORD HERE
            },
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: 'sabha@simply.science', // Replace with the actual recipient
            subject: 'Test Email from Node.js (App Password)',
            text: 'Hello from your Node.js application using an App Password!',
            html: '<b>Hello from your Node.js application using an App Password!</b>',
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

sendMail();