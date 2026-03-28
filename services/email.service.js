import nodemailer from 'nodemailer';

// 1. Configuration du transporteur (Le bureau de poste)
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4f38d4cd4629ae",
    pass: "8cff5519f38d83"
  }
});

// 2. La fonction magique réutilisable
export const sendEmail = async (options) => {
    const mailOptions = {
        from: '"Ma Super App" <${process.env.EMAIL_FROM}>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: `<div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
                <h2>${options.subject}</h2>
                <p>${options.message}</p>
        </div>`
    };
        try {
        const info = await transport.sendMail(mailOptions);
        console.log("Message envoyé vers Mailtrap ID: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email:", error);
        throw error;
    }
};