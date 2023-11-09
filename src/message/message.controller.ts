import { Controller, Post, Body, Get } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessagetDto } from './dto/create-message.dto';

@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}
  @Post('add')
  create(@Body() messageDto: CreateMessagetDto) {
    return this.messageService.createMessage(messageDto);
  }
  @Get('get')
  find(@Body() id) {
    return this.messageService.getMessagesById(id);
  }
}
