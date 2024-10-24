import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(150),
  },
}, {
  tableName: 'role',
  timestamps: false, // Si no quieres que Sequelize maneje los timestamps automáticamente
});

export default Role;