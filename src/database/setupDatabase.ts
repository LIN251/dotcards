import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password'
};

async function setupDatabase() {
  try {
    const connection = await mysql.createConnection(dbConfig);

    // Check if the database exists
    const [rows] = await connection.query('SHOW DATABASES LIKE "dotcards"');
    const databaseExists = (rows as any).length > 0;

    if (!databaseExists) {
      // Create the database if it does not exist
      await connection.query('CREATE DATABASE dotcards');
      console.log('Database "dotcards" created!');
    }

    // Use the 'dotcards' database
    await connection.query('USE dotcards');

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
