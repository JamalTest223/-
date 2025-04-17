 import { IEmailService } from "@/src/core/domain/services/emailServiceInterface";
import nodemailer from "nodemailer";

export class EmailService implements IEmailService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT!),
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });
  async sendEmail(options: { to: string; subject: string; body: string }) {
    console.log(options);
    await this.transporter.sendMail(options);
    console.log("Email sent successfully");
  }
}
