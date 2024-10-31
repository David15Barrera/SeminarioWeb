import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Store = sequelize.define('store', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  }, {
    tableName: 'store',
    timestamps: true, // Esto añade automáticamente createdAt y updatedAt
    createdAt: 'created_at', // Nombra la columna createdAt como created_at
    updatedAt: false, // Si no quieres la columna updatedAt
  });
  
  
export default Store;
