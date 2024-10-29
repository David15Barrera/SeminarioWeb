// src/models/chatParticipants.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ChatParticipants = sequelize.define('ChatParticipants', {
  chat_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}, {
  tableName: 'chat_participants',
  timestamps: false,
});

export default ChatParticipants;
