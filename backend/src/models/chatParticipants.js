// src/models/chatParticipants.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Chat from './chat.js';
import User from './user.js';

const ChatParticipants = sequelize.define('ChatParticipants', {
  chat_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Chat,
      key: 'id',
    },
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    primaryKey: true,
  },
}, {
  tableName: 'chat_participants',
  timestamps: false,
});

export default ChatParticipants;
