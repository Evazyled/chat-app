import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './message.model';
import { CreateMessagetDto } from './dto/create-message.dto';

import { Chat } from 'src/chat/chat.model';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message) private messageModel: typeof Message,
    @InjectModel(Chat) private chatModel: typeof Chat,
  ) {}

  async createMessage(dto: CreateMessagetDto) {
    let message = await this.messageModel.create(dto);
    return message;
  }
  async getMessagesById(id) {
    const c = await this.messageModel.findOne({ where: id });
    if (!c) {
      throw new HttpException(
        `Чат с id ${id} не существует`,
        HttpStatus.CONFLICT,
      );
    }
    const message = await this.messageModel.findAll({
      where: id,
    });
    return message;
  }
}
