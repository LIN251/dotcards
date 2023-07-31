
import express from 'express';
import { createCollection, getCollectionById, updateCollection, deleteCollection } from './controllers/collectionController';
import { sequelize } from './sequelize';

const app = express();
const port = 3000; 

// Middleware to parse incoming JSON data
app.use(express.json());

// CRUD routes
app.post('/:collection', createCollection);
app.get('/:collection/:id', getCollectionById);
app.post('/:collection/:id', updateCollection);
app.delete('/:collection/:id', deleteCollection);

// Define a route handler for the root path
app.get('/', (req, res) => {
    res.send('Hello, welcome to database proxy!');
});

// Sync Sequelize models with the database and start the server
sequelize.sync().then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.error('Error setting up database:', error.message);
});