import dotenv from 'dotenv';
import Sequelize from 'sequelize';

dotenv.config();

const db = new Sequelize(
    process.env.DB_NAME || 'mydb',
    process.env.DB_USER || 'myuser',
    process.env.DB_PASS || 'mypass',
    {
        dialect: process.env.DB_TYPE || 'mysql',
        host: process.env.DB_HOST || 'myhost',
        logging: false,
    });
export default db;
