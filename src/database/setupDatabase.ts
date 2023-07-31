import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// get the database configuration from environment variables
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
};

// Create the database and tables if they do not exist
async function setupDatabase() {
  const databaseName = process.env.DB_NAME || 'dotcards';
  try {
    const connection = await mysql.createConnection(dbConfig);

    // Check if the database exists
    const [rows] = await connection.query('SHOW DATABASES LIKE ?', [databaseName]);
    const databaseExists = (rows as any).length > 0;

    if (!databaseExists) {
      // Create the database if it does not exist
      await connection.query('CREATE DATABASE ??', [databaseName]);
      console.log(`Database "${databaseName}" created!`);
    }

    // Use the database
    await connection.query('USE ??', [databaseName]);

    // Read and execute the 'setupDatabase.sql' script
    const schemaFilePath = path.join(__dirname, 'setupDatabase.sql');
    const schemaSql = fs.readFileSync(schemaFilePath, 'utf8');
    const sqlStatements = schemaSql.split(';').filter((statement) => statement.trim() !== '');

    for (const statement of sqlStatements) {
      await connection.query(statement);
    }

    console.log('Database setup complete!');
    connection.end();
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'message' in error) {
      console.error('Error setting up database:', (error as Error).message);
    } else {
      console.error('Unknown error occurred during database setup:', error);
    }
  }
}

setupDatabase();
