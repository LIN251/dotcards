import { Request, Response } from 'express';
import { createCollection, updateCollection, deleteCollection } from '../controllers/collectionController';

// Mock express request and response objects
var mockReq = {} as Request;
var mockRes: Partial<Response>;

beforeEach(() => {
  mockReq = {} as Request;
  mockRes = {
    status: jest.fn(() => mockRes as Response),
    json: jest.fn(),
  };
});

describe('updateCollection', () => {
  it('This test will update an item in the user database', async () => {
    // Test Create Collection
    mockReq.params = { collection: 'users' };
    mockReq.body = { name: 'testUser', email: 'test@example.com' };

    // Call the controller function to create an item
    await createCollection(mockReq, mockRes as Response);
    const responseData = (mockRes.json as jest.Mock).mock.calls[0][0];
    const id = responseData.item.id;

    // Create a new mock function
    mockRes.status = jest.fn(); 
    mockRes.json = jest.fn();   

    // Mock the request params to include the collection name and item ID
    mockReq.params = { collection: 'users', id: String(id) };
    mockReq.body = { name: 'updatedUser', email: 'updated@example.com' };

    // Call the updateCollection function to update the item
    await updateCollection(mockReq, mockRes as Response);

    // Assert the response
    const responseData2 = (mockRes.json as jest.Mock).mock.calls[0][0];
    expect(responseData2.message).toBe('Item updated successfully');

    mockReq.params = { collection: 'users', id: String(id) };
    // clean up the mock response object
    await deleteCollection(mockReq, mockRes as Response);
    
  });
});
