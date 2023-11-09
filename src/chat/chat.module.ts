import { Module, forwardRef } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { Chat } from './chat.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { UserChats } from './user-chats.model';
import { UserModule } from 'src/user/user.module';
import { MessageModule } from 'src/message/message.module';
import { Message } from 'src/message/message.model';

@Module({
  providers: [ChatService],
  controllers: [ChatController],
  imports: [
    SequelizeModule.forFeature([Chat, User, UserChats, Message]),
    UserModule,
    MessageModule,
  ],
})
export class ChatModule {}
