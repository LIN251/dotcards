"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = exports.Users = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dbConfig = {
    database: 'dotcards',
    user: 'root',
    password: 'password',
    host: 'localhost',
};
// Use a MySQL database
const sequelize = new sequelize_1.Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mysql',
});
exports.sequelize = sequelize;
// Define the 'users' model based on the schema
const Users = sequelize.define('users', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
exports.Users = Users;
// Define the 'products' model based on the schema
const Products = sequelize.define('products', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
});
exports.Products = Products;
