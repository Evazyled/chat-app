//@ts-nocheck
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chat.model';
import { CreateChatDto } from './dto/create-chat.dto';
import { UserService } from 'src/user/user.service';
import { UserChats } from './user-chats.model';
import { Message } from 'src/message/message.model';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat) private chatModel: typeof Chat,
    @InjectModel(UserChats) private userChatModel: typeof UserChats,
    @InjectModel(Message) private messageModel: typeof Message,
  ) {}

  async getChatsByUserId(user) {
    let chats = await this.userChatModel.findAll({
      where: user,
    });

    return chats;
  }

  async createChat(dto: CreateChatDto) {
    const alreadyExistChat = this.chatModel.findOne(dto.name);
    if (alreadyExistChat) {
      throw new HttpException(
        `Чат с именем ${dto.name} уже существует`,
        HttpStatus.FORBIDDEN,
      );
    }
    const chat = await this.chatModel.create({
      name: dto.name,
    });

    dto.users.forEach((user) =>
      this.userChatModel.create({ user: Number(user), chatId: chat.id }),
    );

    console.log(dto.name);
    return chat;
  }
}
