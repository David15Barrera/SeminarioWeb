// src/models/cartItem.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const CartItem = sequelize.define('CartItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sub_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  cart_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'cart',
      key: 'id',
    },
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'product',
      key: 'id',
    },
  },
}, {
  tableName: 'cart_item',
  timestamps: false,
});

export default CartItem;
