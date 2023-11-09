import { DataTypes } from 'sequelize';
import {
  Model,
  Table,
  Column,
  BelongsToMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Chat } from 'src/chat/chat.model';
import { User } from 'src/user/user.model';
interface MessageCreationAttrs {
  chat: number;
  author: number;
  text: string;
}
@Table({ tableName: 'messages' })
export class Message extends Model<Message, MessageCreationAttrs> {
  @Column({
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ForeignKey(() => User)
  @Column({ type: DataTypes.INTEGER })
  author: number;
  @ForeignKey(() => Chat)
  @Column({ type: DataTypes.INTEGER })
  chat: number;
  @Column({ type: DataTypes.STRING })
  text: string;
  @Column({ type: DataTypes.DATE })
  created_at: Date;
  @BelongsTo(() => User)
  userId: User;
}
