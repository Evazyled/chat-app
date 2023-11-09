import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './message.model';
import { CreateMessagetDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(@InjectModel(Message) private messageModel: typeof Message) {}
  async createMessage(dto: CreateMessagetDto) {
    let message = await this.messageModel.create(dto);
    return message;
  }
  async getMessagesById(id) {
    const message = await this.messageModel.findAll({
      where: id,
    });
    return message;
  }
}
