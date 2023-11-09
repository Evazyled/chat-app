import {
  Controller,
  Post,
  Body,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('add')
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }
}
