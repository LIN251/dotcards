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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCollection = exports.updateCollection = exports.getCollectionById = exports.createCollection = void 0;
const sequelize_1 = require("../sequelize");
const schema_1 = require("../database/schema");
const sequelize_2 = require("sequelize");
// Read the schema on server startup
const schema = (0, schema_1.readSchemaFile)();
// Define Sequelize models based on the schema
for (const tableName in schema) {
    const tableSchema = schema[tableName];
    const modelAttributes = {};
    for (const columnName in tableSchema) {
        const dataType = tableSchema[columnName];
        modelAttributes[columnName] = {
            type: getSequelizeDataType(dataType),
            allowNull: false,
        };
    }
    sequelize_1.sequelize.define(tableName, modelAttributes);
}
// Helper function to get the Sequelize data type based on the schema data type
function getSequelizeDataType(dataType) {
    // Add more mappings as needed based on your schema data types
    if (dataType === 'INT' || dataType === 'INTEGER') {
        return sequelize_2.DataTypes.INTEGER;
    }
    else if (dataType === 'VARCHAR') {
        return sequelize_2.DataTypes.STRING;
    }
    else if (dataType === 'DECIMAL') {
        return sequelize_2.DataTypes.DECIMAL(10, 2); // Change the precision and scale as needed
    }
    // Return a default data type if no mapping is found
    return sequelize_2.DataTypes.STRING;
}
function createCollection(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { collection } = req.params;
        const tableSchema = schema[collection];
        if (!tableSchema) {
            return res.status(404).json({ error: 'Collection not found in the schema' });
        }
        try {
            const model = sequelize_1.sequelize.models[collection];
            const newItem = yield model.create(req.body);
            res.json({ message: 'Item created successfully', item: newItem.toJSON() });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to create item' });
        }
    });
}
exports.createCollection = createCollection;
function getCollectionById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { collection, id } = req.params;
        const model = sequelize_1.sequelize.models[collection];
        try {
            const item = yield model.findByPk(id);
            if (!item) {
                return res.status(404).json({ error: 'Item not found' });
            }
            res.json(item.toJSON());
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to get item' });
        }
    });
}
exports.getCollectionById = getCollectionById;
function updateCollection(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { collection, id } = req.params;
        const model = sequelize_1.sequelize.models[collection];
        try {
            const item = yield model.findByPk(id);
            if (!item) {
                return res.status(404).json({ error: 'Item not found' });
            }
            yield model.update(req.body, { where: { id } });
            res.json({ message: 'Item updated successfully' });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to update item' });
        }
    });
}
exports.updateCollection = updateCollection;
function deleteCollection(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { collection, id } = req.params;
        const model = sequelize_1.sequelize.models[collection];
        try {
            const item = yield model.findByPk(id);
            if (!item) {
                return res.status(404).json({ error: 'Item not found' });
            }
            yield model.destroy({ where: { id } });
            res.json({ message: 'Item deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to delete item' });
        }
    });
}
exports.deleteCollection = deleteCollection;
