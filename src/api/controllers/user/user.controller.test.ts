// Mocks
import httpMocks from 'node-mocks-http';
// Helpers
import { TestHelper } from '../../../tests/helpers/dbInstanceHelper';
// Entities
import { Users } from '../../entities/user/user.entity';
// Controllers
import UserController from './user.controller';
// Data Source
import { AppDataSource } from '../../../configs/database.config';
// HTTP Status Codes
import httpStatusCodes from 'http-status-codes';

const userRepository = AppDataSource.manager.getRepository(Users);

describe('UserController Test', () => {
  let mockRequest = httpMocks.createRequest();
  let mockResponse = httpMocks.createResponse();

  beforeAll(async () => {
    await TestHelper.instance.setupTestDB();
  });

  afterAll(() => {
    TestHelper.instance.teardownTestDB();
  });

  afterEach(() => {
    mockRequest = httpMocks.createRequest();
    mockResponse = httpMocks.createResponse();
  });

  describe('UserController.getProfile', () => {
    it('should return 404 due to entity not found', async () => {
      mockRequest.params = {
        id: '1',
      };

      await UserController.getProfile(mockRequest, mockResponse);

      const message = JSON.parse(mockResponse._getData());
      const errorMesage = { message: message.error.message };

      expect(mockResponse.statusCode).toEqual(httpStatusCodes.NOT_FOUND);
      expect(errorMesage).toEqual({ message: 'User not found' });
    });

    it('should return 200 with the user object', async () => {
      mockRequest.params = {
        id: '1',
      };
      const mockUser: Partial<Users> = {
        id: '1',
        email: 'murat@deusmur.com',
        firstName: 'Murat',
        lastName: 'Demirci',
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(mockUser as Users);
      await UserController.getProfile(mockRequest, mockResponse);

      const response = JSON.parse(mockResponse._getData());

      expect((userRepository as jest.Mocked<typeof userRepository>).findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(mockResponse.statusCode).toEqual(httpStatusCodes.OK);
      expect(response).toEqual(mockUser);
    });
  });
});
