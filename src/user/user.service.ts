import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}
  async createUser(dto: CreateUserDto) {
    if (!dto.username) {
      throw new HttpException(`Введите имя пользователя`, HttpStatus.FORBIDDEN);
    }
    const candidate = await this.getOneUser(dto.username);

    if (candidate) {
      throw new HttpException(
        `Пользователь с именем ${dto.username} уже существует`,
        HttpStatus.FORBIDDEN,
      );
    }
    const user = await this.userModel.create(dto);
    return user;
  }
  async getOneUser(username: string) {
    const user = await this.userModel.findOne({
      where: {
        username,
      },
    });
    return user;
  }
}
