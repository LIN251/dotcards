import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
  database: process.env.DB_NAME || 'dotcards',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || "localhost"
};

// Use a MySQL database
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
});

// Define the 'users' model based on the schema
const Users = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define the 'products' model based on the schema
const Products = sequelize.define('products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

// Define associations if there are any between the models
// For example, if there is a relationship between users and products, you can define it here.

export { sequelize, Users, Products };
