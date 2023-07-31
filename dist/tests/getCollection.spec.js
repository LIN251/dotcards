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
const collectionController_1 = require("../controllers/collectionController");
// Mock express request and response objects
var mockReq = {};
var mockRes;
beforeEach(() => {
    // Reset request and response objects before each test
    mockReq = {};
    mockRes = {
        status: jest.fn(() => mockRes),
        json: jest.fn(),
    };
});
describe('createCollection', () => {
    it('This test will create an item in the user database', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the collection name and request body
        mockReq.params = { collection: 'users' };
        mockReq.body = { name: 'testUser', email: 'test@example.com' };
        yield (0, collectionController_1.createCollection)(mockReq, mockRes);
        const responseData = mockRes.json.mock.calls[0][0];
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
        yield (0, collectionController_1.deleteCollection)(mockReq, mockRes);
    }));
});
