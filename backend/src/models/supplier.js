import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Product from './product.js';
const Supplier = sequelize.define('supplier', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
}, {
  tableName:'supplier',
  timestamps: false,
});


Product.belongsTo(Supplier, { foreignKey: 'supplier_id' }); 
export default Supplier;
