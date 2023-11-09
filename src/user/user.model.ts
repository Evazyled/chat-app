import { DataTypes } from 'sequelize';
import {
  Model,
  Table,
  Column,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Chat } from 'src/chat/chat.model';
import { UserChats } from 'src/chat/user-chats.model';
import { Message } from 'src/message/message.model';

interface UserCreationAttrs {
  username: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataTypes.INTEGER,

    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({ type: DataTypes.STRING, unique: true })
  username: string;
  @Column({ type: DataTypes.DATE })
  created_at: Date;
  @BelongsToMany(() => Chat, () => UserChats)
  chats: Chat[];
  @HasMany(() => Message)
  messages: Message[];
}
