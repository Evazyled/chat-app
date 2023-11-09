import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
/* import { User } from 'src/user/user.model';
import { Chat } from 'src/chat/chat.model'; */
import { Message } from './message.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [MessageService],
  controllers: [MessageController],
  imports: [SequelizeModule.forFeature([Message])],
})
export class MessageModule {}
