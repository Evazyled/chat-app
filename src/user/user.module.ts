import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Chat } from 'src/chat/chat.model';
import { UserChats } from 'src/chat/user-chats.model';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [SequelizeModule.forFeature([User, Chat, UserChats])],
  exports: [UserService],
})
export class UserModule {}
