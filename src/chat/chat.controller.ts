import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { request } from 'http';

@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}
  @Post('add')
  create(@Body() chatDto: CreateChatDto) {
    return this.chatService.createChat(chatDto);
  }
  @Get('get')
  find(@Body() user) {
    return this.chatService.getChatsByUserId(user);
  }
}
