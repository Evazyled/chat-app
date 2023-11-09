//@ts-nocheck
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chat.model';
import { CreateChatDto } from './dto/create-chat.dto';
import { UserService } from 'src/user/user.service';
import { UserChats } from './user-chats.model';
import { Message } from 'src/message/message.model';
import { Console } from 'console';

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
    let name = await this.chatModel.findAll({
      where: {},
    });
    return name;
  }

  async createChat(dto: CreateChatDto) {
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
