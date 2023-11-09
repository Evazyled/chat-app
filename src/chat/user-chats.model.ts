import { DataTypes } from 'sequelize';
import {
  Model,
  Table,
  Column,
  BelongsToMany,
  ForeignKey,
  BelongsToAssociation,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';
import { Chat } from './chat.model';

@Table({ tableName: 'user_chats' })
export class UserChats extends Model<User, Chat> {
  @Column({
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ForeignKey(() => User)
  @Column({ type: DataTypes.INTEGER, unique: true })
  user: number;
  @ForeignKey(() => Chat)
  @Column({ type: DataTypes.INTEGER, unique: true })
  chatId: number;
  @Column({ type: DataTypes.DATE })
  created_at: Date;
}
