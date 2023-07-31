"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const collectionController_1 = require("./controllers/collectionController");
const sequelize_1 = require("./sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware to parse incoming JSON data
app.use(express_1.default.json());
// CRUD routes
app.post('/:collection', collectionController_1.createCollection);
app.get('/:collection/:id', collectionController_1.getCollectionById);
app.post('/:collection/:id', collectionController_1.updateCollection);
app.delete('/:collection/:id', collectionController_1.deleteCollection);
// Define a route handler for the root path
app.get('/', (req, res) => {
    res.send('Hello, welcome to database proxy!');
});
// Sync Sequelize models with the database and start the server
sequelize_1.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.error('Error setting up database:', error.message);
});
