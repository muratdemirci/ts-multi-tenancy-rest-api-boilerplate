// Entities
import { Tenant } from '../../entities/tenant/tenant.entity';
import { Users } from '../../entities/user/user.entity';

// Utilities
import ApiUtility from '../../../utilities/api.utility';
import DateTimeUtility from '../../../utilities/date-time.utility';

// Interfaces
import {
  IAssignUser,
  ICreateTenant,
  ITenantQueryParams,
  IUnassignUser,
  IUpdateTenant,
} from '../../interfaces/tenant/tenant.interface';
import { IDeleteById, IDetailById } from '../../../interfaces/common.interface';

// Errors
import { StringError } from '../../../errors/string.error';

// Data Source
import { AppDataSource } from '../../../configs/database.config';

//Constants
const where = { isDeleted: false };
const tenantRepository = AppDataSource.manager.getRepository(Tenant);
const userRepository = AppDataSource.manager.getRepository(Users);

const create = async (params: ICreateTenant) => {
  const item = new Tenant();
  item.name = params.name;
  item.status = params.status || 'pending';
  item.domains = params.domains.map((domain) => domain.toString()) || [];
  item.users = params.users || [];
  const tenantData = await AppDataSource.manager.getRepository(Tenant).save(item);
  return ApiUtility.sanitizeData(tenantData);
};

const getById = async (params: IDetailById) => {
  try {
    const data = await AppDataSource.manager.getRepository(Tenant).findOne({
      where: { id: String(params.id) },
    });
    return ApiUtility.sanitizeData(data as Tenant);
  } catch (e) {
    return null;
  }
};

const update = async (params: IUpdateTenant) => {
  const query = { ...where, id: params.id };

  const tenant = await AppDataSource.manager.getRepository(Tenant).find({ where: query });
  if (!tenant) {
    throw new StringError('Tenant is not existed');
  }

  return await AppDataSource.manager.getRepository(Tenant).update(query, {
    name: params.name,
    status: params.status,
    domains: params.domains.map((domain) => domain.toString()),
    users: params.users,
    updatedAt: DateTimeUtility.getCurrentTimeStamp(),
  });
};

const list = async (params: ITenantQueryParams) => {
  let tenantRepo = ApiUtility.initQueryBuilder(tenantRepository, 'tenant', false);

  if (params.keyword) {
    tenantRepo = tenantRepo.andWhere(
      '(LOWER(tenant.name) LIKE LOWER(:keyword) OR LOWER(tenant.status) LIKE LOWER(:keyword))',
      { keyword: `%${params.keyword}%` },
    );
  }

  tenantRepo = ApiUtility.paginate(tenantRepo, params);
  const tenants = await tenantRepo.getMany();

  const response = [];
  const totalCount = tenants.length;

  if (tenants && tenants.length) {
    for (const item of tenants) {
      response.push(ApiUtility.sanitizeData(item));
    }
  }

  return { response, totalCount };
};

const remove = async (params: IDeleteById) => {
  const query = { ...where, id: String(params.id) };

  const tenant = await AppDataSource.manager.getRepository(Tenant).find({ where: query });
  if (!tenant) {
    throw new StringError('Tenant is not existed');
  }

  return await AppDataSource.manager.getRepository(Tenant).update(query, {
    isDeleted: true,
    updatedAt: DateTimeUtility.getCurrentTimeStamp(),
  });
};

const assignUser = async (params: IAssignUser) => {
  const user = await userRepository.findOne({ where: { id: params.userId }, relations: ['tenants'] });

  if (!user) {
    throw new Error('User not found');
  }

  const tenant = await tenantRepository.findOne({ where: { id: params.tenantId } });

  if (!tenant) {
    throw new Error('User or tenant not found');
  }
  // Add the tenant to the user's tenants array
  user.tenants.push(tenant);

  // Save the user
  const updatedTenant = await userRepository.save(user);

  return ApiUtility.sanitizeData(updatedTenant);
};

const unassignUser = async (params: IUnassignUser) => {
  const user = await userRepository.findOne({ where: { id: params.userId }, relations: ['tenants'] });

  if (!user) {
    throw new Error('User not found');
  }

  const tenant = await tenantRepository.findOne({ where: { id: params.tenantId } });

  if (!tenant) {
    throw new Error('Tenant not found');
  }

  // Check if the user is assigned to the tenant
  const tenantIndex = user.tenants.findIndex((t) => t.id === tenant.id);

  if (tenantIndex === -1) {
    throw new Error('User is not assigned to this tenant');
  }

  // Remove the tenant from the user's tenants array
  user.tenants.splice(tenantIndex, 1);

  // Save the user
  const updatedUser = await userRepository.save(user);

  return ApiUtility.sanitizeData(updatedUser);
};

const listUsers = async (req: any) => {
  let tenantRepo = ApiUtility.initQueryBuilder(tenantRepository, 'tenant', false);

  const tenantId = req.params.id;

  const start = parseInt(ApiUtility.getQueryParam(req, '_start'), 10) || 0;
  const end = parseInt(ApiUtility.getQueryParam(req, '_end'), 10) || 10;
  const keyword = ApiUtility.getQueryParam(req, 'keyword');
  const limit = end - start;
  const skip = start;

  const params: ITenantQueryParams = { tenantId, limit, skip, keyword };

  const tenant = await tenantRepo
    .where('tenant.id = :id', { id: params.tenantId })
    .leftJoinAndSelect('tenant.users', 'users')
    .getOne();

  if (!tenant) {
    throw new Error('Tenant not found');
  }

  if (!tenant.users || tenant.users.length === 0) {
    throw new Error('No users found for this tenant');
  }

  tenantRepo = ApiUtility.paginate(tenantRepo, params);

  const users = await tenantRepo.getMany();
  const totalCount = users.length;

  const response = users
    .map((tenant) => tenant.users)
    .flat()
    .map((user) => ApiUtility.sanitizeData(user));

  return { response, totalCount };
};

async function isUserAssignedToTenant(tenantId: string, userId: string): Promise<boolean> {
  const user = await userRepository.findOne({ where: { id: userId }, relations: ['tenants'] });

  if (!user) {
    throw new Error('User not found');
  }

  return user.tenants.some((tenant) => tenant.id === tenantId);
}

export default {
  create,
  getById,
  update,
  list,
  remove,
  assignUser,
  unassignUser,
  listUsers,
  isUserAssignedToTenant,
};
