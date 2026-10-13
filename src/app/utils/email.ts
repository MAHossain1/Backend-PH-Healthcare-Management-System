/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer';
import { envVars } from '../config/env';
import AppError from '../errorHelper/AppError';
import status from 'http-status';
import path from 'node:path';
import ejs from 'ejs';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const transporter = nodemailer.createTransport({
  host: envVars.EMAIL_SENDER.SMTP_HOST,
  secure: true,
  port: Number(envVars.EMAIL_SENDER.SMTP_PORT),
  auth: {
    user: envVars.EMAIL_SENDER.SMTP_USER,
    pass: envVars.EMAIL_SENDER.SMTP_PASS,
  },
});

interface SendEmailOptions {
  to: string;
  subject: string;
  templateName: string;
  templateData: Record<string, any>;
  attachments?: {
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }[];
}

export const sendEmail = async ({
  to,
  subject,
  templateName,
  templateData,
  attachments,
}: SendEmailOptions) => {
  const posixPath = path.posix;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = posixPath.dirname(__filename);

  try {
    const templatePath = posixPath.join(
      __dirname,
      '..',
      'templates',
      `${templateName}.ejs`,
    );

    console.log('Resolved template path:', templatePath);
    console.log('File exists:', fs.existsSync(templatePath));

    const html = await ejs.renderFile(templatePath, templateData);

    const info = await transporter.sendMail({
      from: envVars.EMAIL_SENDER.SMTP_FROM,
      to,
      subject,
      html,
      attachments: attachments?.map(attachment => ({
        filename: attachment.filename,
        content: attachment.content,
        contentType: attachment.contentType,
      })),
    });

    console.log(`Email sent to ${to} : ${info.messageId}`);
  } catch (error: any) {
    console.log('Error sending email:', error);
    throw new AppError(status.INTERNAL_SERVER_ERROR, 'Failed to send email');
  }
};
