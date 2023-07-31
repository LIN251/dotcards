import { Request, Response } from 'express';
import { createCollection,  deleteCollection } from '../controllers/collectionController';

// Mock express request and response objects
var mockReq = {} as Request;
var mockRes: Partial<Response>;

beforeEach(() => {
  // Reset request and response objects before each test
  mockReq = {} as Request;
  mockRes = {
    status: jest.fn(() => mockRes as Response),
    json: jest.fn(),
  };
});


describe('createCollection', () => {
  it('This test will create an item in the user database', async () => {

    // Mock the collection name and request body
    mockReq.params = { collection: 'users' };
    mockReq.body = { name: 'testUser', email: 'test@example.com' };
    await createCollection(mockReq, mockRes as Response);

    const responseData = (mockRes.json as jest.Mock).mock.calls[0][0];
    const id = responseData.item.id;
    
    // Assert the response
    expect(responseData.message).toBe('Item created successfully');
    expect(responseData.item).toEqual({
      id: expect.any(Number),
      name: 'testUser',
      email: 'test@example.com',
      updatedAt: expect.any(Date),
      createdAt: expect.any(Date),
    });

    mockReq.params = { collection: 'users', id: String(id) };
    // clean up the mock response object
    await deleteCollection(mockReq, mockRes as Response);
  });
});


