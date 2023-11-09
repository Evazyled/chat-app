import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { User } from './user/user.model';
import { ChatModule } from './chat/chat.module';
import { Chat } from './chat/chat.model';
import { UserChats } from './chat/user-chats.model';
import { MessageModule } from './message/message.module';
import { Message } from './message/message.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'chat',
      synchronize: true,
      models: [User, Chat, UserChats, Message],
      autoLoadModels: true,
      define: {
        /*  defaultScope: {
          attributes: { exclude: ['updatedAt'] },
        }, */
        timestamps: true,
        updatedAt: false,
        createdAt: 'created_at',
      },
    }),

    UserModule,

    ChatModule,

    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
