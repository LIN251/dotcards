"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readSchemaFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Read the schema file and parse its content
function readSchemaFile() {
    const schemaFilePath = path_1.default.join(__dirname, '../database/schema.json');
    try {
        const data = fs_1.default.readFileSync(schemaFilePath, 'utf8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error('Error reading schema file:', error);
        return {};
        // Return an empty object in case of error
    }
}
exports.readSchemaFile = readSchemaFile;
