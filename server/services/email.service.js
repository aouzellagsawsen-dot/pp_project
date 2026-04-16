import nodemailer from 'nodemailer'

var transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

// 2. La fonction magique réutilisable
export const sendEmail = async (options) => {
    const mailOptions = {
        from: `"Ma Super App" <${process.env.EMAIL_FROM || 'noreply@alinea.local'}>`,
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
}