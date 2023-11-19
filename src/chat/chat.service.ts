//@ts-nocheck
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chat.model';
import { CreateChatDto } from './dto/create-chat.dto';
import { UserService } from 'src/user/user.service';
import { UserChats } from './user-chats.model';
import { Message } from 'src/message/message.model';
import { FindChat, FindChatDto } from './dto/find-chat.dto';
import { User } from 'src/user/user.model';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat) private chatModel: typeof Chat,
    @InjectModel(UserChats) private userChatModel: typeof UserChats,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async getChatsByUserId(user: FindChatDto) {
    let chats = await this.userChatModel.findAll({
      where: user,
    });
    let data = [];

    for (let chat of chats) {
      let c = await this.chatModel.findByPk(chat.chatId, {
        include: { all: true },
      });
      data.push(c);
    }
    return data;
    /* let name = await this.chatModel.findAll({
      where: { chatId: chats.chatId },
    });
    return name; */
    /* let name = chats.map(async (chat) => {
      console.log(chat.chatId);
      await this.chatModel.findByPk(chat.chatId);
    });
 */
  }

  async createChat(dto: CreateChatDto) {
    const alreadyExistChat = await this.chatModel.findOne({
      where: {
        name: dto.name,
      },
    });
    console.log(dto.name);

    /* if (alreadyExistChat) {
      throw new HttpException(
        `Чат с именем ${dto.name} уже существует`,
        HttpStatus.FORBIDDEN,
      );
    } */

    let checkUsers = [];
    for (let user of dto.users) {
      try {
        let u = await this.userModel.findByPk(user);
        checkUsers.push(u.id);
      } catch (u) {
        throw new HttpException(`юзера с  нет`, HttpStatus.FORBIDDEN);
      }
    }
    if (checkUsers) {
      console.log(checkUsers);
    }

    const chat = await this.chatModel.create({
      name: dto.name,
    });

    dto.users.forEach((user) =>
      this.userChatModel.create({ user: Number(user), chatId: chat.id }),
    );

    /*  console.log(dto.name); */
    return chat;
  }
}
