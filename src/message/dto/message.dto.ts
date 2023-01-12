import { IsNotEmpty } from 'class-validator';

export class MessageDto {
  @IsNotEmpty()
  chatId: string;

  @IsNotEmpty()
  content: string;
}
