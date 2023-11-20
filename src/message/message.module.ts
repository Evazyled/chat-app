import { Module, forwardRef } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
/* import { User } from 'src/user/user.model';
import { Chat } from 'src/chat/chat.model'; */
import { Message } from './message.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { UserModule } from 'src/user/user.module';
import { Chat } from 'src/chat/chat.model';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  providers: [MessageService],
  controllers: [MessageController],
  imports: [
    SequelizeModule.forFeature([Message, Chat, User]),
    forwardRef(() => ChatModule),
  ],
})
export class MessageModule {}
