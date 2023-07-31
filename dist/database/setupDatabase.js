"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const promise_1 = __importDefault(require("mysql2/promise"));
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'password'
};
function setupDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield promise_1.default.createConnection(dbConfig);
            // Check if the database exists
            const [rows] = yield connection.query('SHOW DATABASES LIKE "dotcards"');
            const databaseExists = rows.length > 0;
            if (!databaseExists) {
                // Create the database if it does not exist
                yield connection.query('CREATE DATABASE dotcards');
                console.log('Database "dotcards" created!');
            }
            // Use the 'dotcards' database
            yield connection.query('USE dotcards');
            // Read and execute the 'setupDatabase.sql' script
            const schemaFilePath = path_1.default.join(__dirname, 'setupDatabase.sql');
            const schemaSql = fs_1.default.readFileSync(schemaFilePath, 'utf8');
            const sqlStatements = schemaSql.split(';').filter((statement) => statement.trim() !== '');
            for (const statement of sqlStatements) {
                yield connection.query(statement);
            }
            console.log('Database setup complete!');
            connection.end();
        }
        catch (error) {
            if (typeof error === 'object' && error !== null && 'message' in error) {
                console.error('Error setting up database:', error.message);
            }
            else {
                console.error('Unknown error occurred during database setup:', error);
            }
        }
    });
}
setupDatabase();
