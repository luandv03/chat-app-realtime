import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { TMailOptional } from './mail.types';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(optional: TMailOptional): Promise<void> {
    await this.mailerService.sendMail({
      to: optional?.to,
      subject: optional?.subject,
      context: optional?.context,
      template: optional?.template,
    });
  }
}
