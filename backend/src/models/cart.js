import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  total: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: false,
  },
  tax: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.ENUM("PAYPAL", "PAYMENT_GATEWAY"),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('COMPLETED', 'CANCELLED_ERROR', 'PENDING'),
    allowNull: false,
  },
  description_error: {
    type: DataTypes.STRING(250),
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  discount_payment_method: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'cart',
  timestamps: false,
});

export default Cart;
