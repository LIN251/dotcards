import fs from 'fs';
import path from 'path';

// Define the TableSchema interface
export interface TableSchema {
  [columnName: string]: string;
}

// Define the DatabaseSchema interface
export interface DatabaseSchema {
  [tableName: string]: TableSchema;
}

// Function to read the schema file and parse its content
export function readSchemaFile(): DatabaseSchema {
  const schemaFilePath = path.join(__dirname, '../database/schema.json');
  try {
    const data = fs.readFileSync(schemaFilePath, 'utf8');
    return JSON.parse(data) as DatabaseSchema;
  } catch (error) {
    console.error('Error reading schema file:', error);
    return {}; // Return an empty object in case of error
  }
}