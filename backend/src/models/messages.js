import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Chat from './chat.js';

const Messages = sequelize.define('Messages', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  chat_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Chat,
      key: 'id',
    },
  },
}, {
  tableName: 'messages',
  timestamps: false,
});

export default Messages;
