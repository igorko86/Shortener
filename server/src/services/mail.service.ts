import nodemailer, { Transporter } from 'nodemailer';

class MailService {
  readonly transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST as unknown as string,
      // host: 'smtp.ukr.net',
      port: process.env.SMTP_PORT as unknown as number,
      // port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        // user: 'megaprojecttest@ukr.net',
        pass: process.env.SMTP_PASSWORD,
        // pass: 'd6uHzWltFtfGaGjN',
      },
    });
  }

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Activation account ${process.env.SERVER_URL}`,
      text: '',
      html: `
        <div>
            <h1>Еo activate, follow the link</h1>
            <a href="${link}">${link}</a>
        </div>
      `,
    });
  }
}

export default new MailService();
