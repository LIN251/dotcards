import { Request, Response } from 'express';
import { sequelize, Users, Products } from '../sequelize';
import { readSchemaFile, DatabaseSchema } from '../database/schema';


// Read the schema on server startup
const schema: DatabaseSchema = readSchemaFile();

// create a new collection
export async function createCollection(req: Request, res: Response) {
  const { collection } = req.params;
  const tableSchema = schema[collection];
  if (!tableSchema) {
    return res.status(404).json({ error: 'Collection not found in the schema' });
  }

  try {
    let model;
    if (collection === 'users') {
      model = Users;
    } else if (collection === 'products') {
      model = Products;
    } else {
      // Handle other collections here if needed
      return res.status(404).json({ error: 'Collection not found' });
    }

    const newItem = await model.create(req.body);

    res.json({ message: 'Item created successfully', item: newItem.toJSON() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item' });
  }
}

// get one item by id in a collection
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


// get one item in a collection
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

// delete an item in a collection
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
