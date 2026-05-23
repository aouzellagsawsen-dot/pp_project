import nodemailer from 'nodemailer'

var transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export const sendEmail = async (options) => {
    const formattedMessage = options.message.replace(/\n/g, '<br>');

    const iconBookOpen = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='%238D7B68' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z'/%3E%3Cpath d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'/%3E%3C/svg%3E";
    const iconKeyRound = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z'/%3E%3Ccircle cx='16.5' cy='7.5' r='.5' fill='white'/%3E%3C/svg%3E";
    const iconChevronLeft = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23a8a29e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m15 18-6-6 6-6'/%3E%3C/svg%3E";

    const mailOptions = {
        from: `"Alinéa" <${process.env.EMAIL_FROM || 'noreply@alinea.local'}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${options.subject}</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #F1EAD7; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; color: #5C544B; -webkit-font-smoothing: antialiased;">
            
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F1EAD7; min-height: 100vh; padding: 40px 16px;">
                <tr>
                    <td align="center" valign="top">
                        
                        <table border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 32px;">
                            <tr>
                                <td valign="middle" style="padding-right: 8px;">
                                    <img src="${iconBookOpen}" width="32" height="32" alt="Book" style="display: block;" />
                                </td>
                                <td valign="middle">
                                    <h1 style="margin: 0; font-family: ui-serif, Georgia, Cambria, 'Times New Roman', serif; font-size: 30px; font-weight: 500; letter-spacing: -0.5px; color: #5C544B;">
                                        Alinéa
                                    </h1>
                                </td>
                            </tr>
                        </table>

                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 440px; background-color: #FFFFFF; border-radius: 40px; border: 1px solid #FFFFFF; box-shadow: 0 10px 25px rgba(231, 229, 228, 0.5); overflow: hidden;">
                            <tr>
                                <td style="padding: 40px; text-align: center;">
                                    
                                    <h2 style="margin: 0 0 16px 0; font-family: ui-serif, Georgia, Cambria, 'Times New Roman', serif; font-size: 30px; font-weight: 600; color: #5C544B;">
                                        ${options.subject}
                                    </h2>

                                    <p style="margin: 0 0 32px 0; font-size: 14px; font-style: italic; color: #78716c; line-height: 1.6;">
                                        ${formattedMessage}
                                    </p>

                                    <table border="0" cellspacing="0" cellpadding="0" width="100%">
                                        <tr>
                                            <td align="center" style="background-color: #8D7B68; border-radius: 24px;">
                                                <a href="${options.link || process.env.FRONTEND_URL}" target="_blank" style="display: inline-block; width: 100%; padding: 16px 0; text-decoration: none;">
                                                    
                                                    <table border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                                                        <tr>
                                                            <td valign="middle" style="padding-right: 8px;">
                                                                <img src="${iconKeyRound}" width="18" height="18" alt="Key" style="display: block;" />
                                                            </td>
                                                            <td valign="middle" style="font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 16px; font-weight: 600; color: #FFFFFF;">
                                                                ${options.buttonText || 'Continuer'}
                                                            </td>
                                                        </tr>
                                                    </table>

                                                </a>
                                            </td>
                                        </tr>
                                    </table>

                                </td>
                            </tr>
                        </table>

                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 440px; margin-top: 32px;">
                            <tr>
                                <td align="center">
                                    <a href="${process.env.FRONTEND_URL}/SignIn" style="font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 14px; color: #a8a29e; text-decoration: none;">
                                        <table border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                                            <tr>
                                                <td valign="middle" style="padding-right: 8px;">
                                                    <img src="${iconChevronLeft}" width="16" height="16" alt="<" style="display: block;" />
                                                </td>
                                                <td valign="middle">
                                                    Go Back to login
                                                </td>
                                            </tr>
                                        </table>
                                    </a>
                                </td>
                            </tr>
                        </table>

                    </td>
                </tr>
            </table>
            
        </body>
        </html>
        `
    };

    const info = await transport.sendMail(mailOptions);
    console.log("Message envoyé vers Mailtrap ID: %s", info.messageId);
    
    return info;
};