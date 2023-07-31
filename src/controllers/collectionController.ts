import { Request, Response } from 'express';
import { sequelize, Users, Products } from '../sequelize';
import { DatabaseSchema, readSchemaFile, TableSchema } from '../database/schema';
import { DataTypes, Model } from 'sequelize';

// Read the schema on server startup
const schema: DatabaseSchema = readSchemaFile();

// Define Sequelize models based on the schema
for (const tableName in schema) {
  const tableSchema: TableSchema = schema[tableName];
  const modelAttributes: any = {};

  for (const columnName in tableSchema) {
    const dataType = tableSchema[columnName];
    modelAttributes[columnName] = {
      type: getSequelizeDataType(dataType),
      allowNull: false,
    };
  }

  sequelize.define(tableName, modelAttributes);
}

// Helper function to get the Sequelize data type based on the schema data type
function getSequelizeDataType(dataType: string): any {
  // Add more mappings as needed based on your schema data types
  if (dataType === 'INT' || dataType === 'INTEGER') {
    return DataTypes.INTEGER;
  } else if (dataType === 'VARCHAR') {
    return DataTypes.STRING;
  } else if (dataType === 'DECIMAL') {
    return DataTypes.DECIMAL(10, 2); // Change the precision and scale as needed
  }

  // Return a default data type if no mapping is found
  return DataTypes.STRING;
}

export async function createCollection(req: Request, res: Response) {
  const { collection } = req.params;
  const tableSchema = schema[collection];
  if (!tableSchema) {
    return res.status(404).json({ error: 'Collection not found in the schema' });
  }

  try {
    const model = sequelize.models[collection];
    const newItem = await model.create(req.body);

    res.json({ message: 'Item created successfully', item: newItem.toJSON() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item' });
  }
}

export async function getCollectionById(req: Request, res: Response) {
  
  const { collection, id } = req.params;
  const model = sequelize.models[collection];

  try {
    const item = await model.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item.toJSON());
  } catch (error) {
    res.status(500).json({ error: 'Failed to get item' });
  }
}

export async function updateCollection(req: Request, res: Response) {
  const { collection, id } = req.params;
  const model = sequelize.models[collection];

  try {
    const item = await model.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    await model.update(req.body, { where: { id } });

    res.json({ message: 'Item updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
}

export async function deleteCollection(req: Request, res: Response) {
  const { collection, id } = req.params;
  const model = sequelize.models[collection];

  try {
    const item = await model.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    await model.destroy({ where: { id } });

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
}
