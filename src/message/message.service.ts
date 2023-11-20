import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './message.model';
import { CreateMessagetDto } from './dto/create-message.dto';

import { Chat } from 'src/chat/chat.model';
import { User } from 'src/user/user.model';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message) private messageModel: typeof Message,
    @InjectModel(Chat) private chatModel: typeof Chat,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async createMessage(dto: CreateMessagetDto) {
    const chat = await this.chatModel.findByPk(dto.chat);
    const author = await this.userModel.findByPk(dto.author);
    if (!dto.text) {
      throw new HttpException(
        `Поле текст не может быть пустым`,
        HttpStatus.FORBIDDEN,
      );
    }
    if (!author) {
      throw new HttpException(
        `Пользователь с id ${dto.author} не существует`,
        HttpStatus.CONFLICT,
      );
    }
    if (!chat) {
      throw new HttpException(
        `Чат с id ${dto.chat} не существует`,
        HttpStatus.CONFLICT,
      );
    }
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
