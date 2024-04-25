// Entities
import { Users } from '../../entities/user/user.entity';
import { Tenant } from '../../entities/tenant/tenant.entity';

// Utilities
import Encryption from '../../../utilities/encryption.utility';
import ApiUtility from '../../../utilities/api.utility';
import DateTimeUtility from '../../../utilities/date-time.utility';

// Interfaces
import { ICreateUser, ILoginUser, IUpdateUser, IUserQueryParams } from '../../interfaces/user/user.interface';
import { IDeleteById, IDetailById } from '../../../interfaces/common.interface';

// Errors
import { StringError } from '../../../errors/string.error';

// Data Source
import { AppDataSource } from '../../../configs/database.config';

// Constants
const where = { isDeleted: false };
const tenantRepository = AppDataSource.manager.getRepository(Tenant);
const userRepository = AppDataSource.manager.getRepository(Users);

const create = async (params: ICreateUser) => {
  const item = new Users();
  item.email = params.email;
  item.password = await Encryption.generateHash(params.password, 10);
  item.firstName = params.firstName;
  item.lastName = params.lastName;
  item.phone = params.phone;
  const userData = await userRepository.save(item);
  return ApiUtility.sanitizeUser(userData);
};

const login = async (params: ILoginUser) => {
  const user = await userRepository
    .createQueryBuilder('user')
    .where('user.email = :email', { email: params.email })
    .select([
      'user.createdAt',
      'user.updatedAt',
      'user.id',
      'user.email',
      'user.password',
      'user.firstName',
      'user.lastName',
      'user.phone',
      'user.isDeleted',
    ])
    .getOne();

  if (!user) {
    throw new StringError('Your email has not been registered');
  }

  if (await Encryption.verifyHash(params.password, user.password)) {
    const accessToken = await Encryption.generateAccessToken({ id: user.id });
    // const cookie = await generateUserCookie(user.id);
    return { ...ApiUtility.sanitizeUser(user), accessToken };
  }

  throw new StringError('Invalid email or password');
};

const getById = async (params: IDetailById) => {
  try {
    const data = await userRepository.findOne({
      where: { id: String(params.id) },
    });
    return ApiUtility.sanitizeUser(data!); // Add type assertion to ensure data is not null
  } catch (e) {
    return null;
  }
};

const detail = async (params: IDetailById) => {
  const query = {
    where: { ...where, id: String(params.id) },
  };

  const user = await userRepository.findOne(query);
  if (!user) {
    throw new StringError('User is not existed');
  }

  return ApiUtility.sanitizeUser(user);
};

const update = async (params: IUpdateUser) => {
  const query = { ...where, id: params.id };

  const user = await userRepository.find({ where: query });
  if (!user) {
    throw new StringError('User is not existed');
  }

  return await userRepository.update(query, {
    firstName: params.firstName,
    lastName: params.lastName,
    email: params.email,
    phone: params.phone,
    address: params.address,
    timezone: params.timezone,
    updatedAt: DateTimeUtility.getCurrentTimeStamp(),
  });
};

const list = async (req: any) => {
  let userRepo = ApiUtility.initQueryBuilder(userRepository, 'users', false);

  const start = parseInt(ApiUtility.getQueryParam(req, '_start'), 10);
  const end = parseInt(ApiUtility.getQueryParam(req, '_end'), 10);
  const keyword = ApiUtility.getQueryParam(req, 'keyword');
  const limit = end - start;
  const skip = start;
  const params: IUserQueryParams = { limit, skip, keyword };

  if (params.keyword) {
    userRepo = userRepo.andWhere(
      '(LOWER(user.firstName) LIKE LOWER(:keyword) OR LOWER(user.lastName) LIKE LOWER(:keyword))',
      { keyword: `%${params.keyword}%` },
    );
  }

  userRepo = ApiUtility.paginate(userRepo, params);
  const users = await userRepo.getMany();

  const response = [];
  const totalCount = users.length;

  if (users && users.length) {
    for (const item of users) {
      response.push(ApiUtility.sanitizeUser(item));
    }
  }

  return { response, totalCount };
};

const remove = async (params: IDeleteById) => {
  const query = { ...where, id: String(params.id) };

  const user = await userRepository.find({ where: query });
  if (!user) {
    throw new StringError('User is not existed');
  }

  return await userRepository.update(query, {
    isDeleted: true,
    updatedAt: DateTimeUtility.getCurrentTimeStamp(),
  });
};

const getUserInTenant = async (userId: string, tenantId: string): Promise<Users | null> => {
  let tenantRepo = ApiUtility.initQueryBuilder(tenantRepository, 'tenant', false);

  const tenant = await tenantRepo
    .where('tenant.id = :id', { id: tenantId })
    .leftJoinAndSelect('tenant.users', 'users')
    .getOne();

  if (!tenant) {
    throw new Error('Tenant not found');
  }

  const user = await tenant.users.find((user: Users) => user.id === userId);

  if (!user) {
    throw new Error('User not found in this tenant');
  }

  return user;
};

const getTenantsByUserId = async (userId: string) => {
  let userRepo = ApiUtility.initQueryBuilder(userRepository, 'user', false);

  const user = await userRepo
    .where('user.id = :id', { id: userId })
    .leftJoinAndSelect('user.tenants', 'tenants')
    .getOne();

  if (!user) {
    throw new Error('User not found');
  }

  if (!user.tenants || user.tenants.length === 0) {
    throw new Error('No tenants found for this user');
  }

  const tenants = user.tenants ? user.tenants.map((tenant: Tenant) => ApiUtility.sanitizeData(tenant)) : [];

  return tenants;
};

export default {
  create,
  login,
  getById,
  detail,
  update,
  list,
  remove,
  getUserInTenant,
  getTenantsByUserId,
};
