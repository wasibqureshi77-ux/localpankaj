import { transporter } from "./transporter";

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: SendEmailParams) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"Local Pankaj" <noreply@localpankaj.com>',
      to,
      subject,
      html,
    });
    console.log("Email sent successfully: ", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error("Email sending failed: ", error.message);
    return { success: false, error: error.message };
  }
};
