import { DataTypes } from 'sequelize';
import {
  Model,
  Table,
  Column,
  BelongsToMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';
import { UserChats } from './user-chats.model';
interface ChatCreationAttrs {
  name: string;
  users: [];
  chatId: number;
}

@Table({ tableName: 'chats' })
export class Chat extends Model<Chat, ChatCreationAttrs> {
  @Column({
    type: DataTypes.INTEGER,
    /* unique: true, */
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ForeignKey(() => UserChats)
  @Column({ type: DataTypes.STRING })
  name: string;
  @Column({ type: DataTypes.DATE })
  created_at: Date;
  @BelongsToMany(() => User, () => UserChats)
  users: User[];
}
