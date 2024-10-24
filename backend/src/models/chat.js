import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Chat = sequelize.define('Chat', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'chat',
  timestamps: false,
});

export default Chat;
