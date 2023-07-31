import { Sequelize, DataTypes } from 'sequelize';

const dbConfig = {
  database: 'dotcards',
  user: 'root',
  password: 'password',
  host: 'localhost',
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
