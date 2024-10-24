import { Sequelize } from 'sequelize'; // Asegúrate de que esto sea correcto
import dotenv from 'dotenv'; // Cambiado de require a import

dotenv.config(); // Esto ahora funcionará correctamente

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
});

export default sequelize;
