import { Request, Response } from 'express';
import { createCollection, deleteCollection } from '../controllers/collectionController';

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

describe('deleteCollection', () => {
  it('This test will delete an item in the user database', async () => {
    // Test Delete Collection
    mockReq.params = { collection: 'users' };
    mockReq.body = { name: 'testUser', email: 'test@example.com' };

    // Call the controller function to create an item
    await createCollection(mockReq, mockRes as Response);
    const responseData = (mockRes.json as jest.Mock).mock.calls[0][0];
    const id = responseData.item.id;

    // Create a new mock function
    mockRes.status = jest.fn(); 
    mockRes.json = jest.fn();   

    mockReq.params = { collection: 'users', id: String(id) };
    await deleteCollection(mockReq, mockRes as Response);

    // Assert the response
    const responseData2 = (mockRes.json as jest.Mock).mock.calls[0][0];
    expect(responseData2.message).toBe('Item deleted successfully');
  });
});
