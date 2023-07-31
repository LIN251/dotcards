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
    mockReq = {};
    mockRes = {
        status: jest.fn(() => mockRes),
        json: jest.fn(),
    };
});
describe('deleteCollection', () => {
    it('This test will delete an item in the user database', () => __awaiter(void 0, void 0, void 0, function* () {
        // Test Delete Collection
        mockReq.params = { collection: 'users' };
        mockReq.body = { name: 'testUser', email: 'test@example.com' };
        // Call the controller function to create an item
        yield (0, collectionController_1.createCollection)(mockReq, mockRes);
        const responseData = mockRes.json.mock.calls[0][0];
        const id = responseData.item.id;
        // Create a new mock function
        mockRes.status = jest.fn();
        mockRes.json = jest.fn();
        mockReq.params = { collection: 'users', id: String(id) };
        yield (0, collectionController_1.deleteCollection)(mockReq, mockRes);
        // Assert the response
        const responseData2 = mockRes.json.mock.calls[0][0];
        expect(responseData2.message).toBe('Item deleted successfully');
    }));
});
