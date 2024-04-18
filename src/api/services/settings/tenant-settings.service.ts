// Entities
import { TenantSettings } from '../../entities/settings/tenant-settings.entity';
import { Tenant } from '../../entities/tenant/tenant.entity';

// Utilities
import ApiUtility from '../../../utilities/api.utility';
import DateTimeUtility from '../../../utilities/date-time.utility';

// Interfaces
import {
  Field,
  ICreateTenantSetting,
  ITenantSettingQueryParams,
  IUpdateTenantSetting,
} from '../../interfaces/setting/tenant-settings.interface';
import { IDeleteById, IDetailById } from '../../../interfaces/common.interface';

// Errors
import { StringError } from '../../../errors/string.error';

// Data Source
import { AppDataSource } from '../../../configs/database.config';

// Services
import tenantService from '../tenant/tenant.service';

// Constants
const where = { isDeleted: false };
const tenantSettingRepository = AppDataSource.manager.getRepository(TenantSettings);

const create = async (params: ICreateTenantSetting) => {
  const tenant = await tenantService.getById({ id: params.tenantId });
  if (!tenant) {
    throw new StringError('Tenant not found');
  }

  const item = new TenantSettings();
  item.name = params.name;
  item.fields = params.fields;
  item.tenantId = params.tenantId;
  item.tenant = tenant as Tenant; // Cast the tenant object to the Tenant type
  const settingData = await tenantSettingRepository.save(item);
  return ApiUtility.sanitizeData(settingData);
};

const getById = async (params: IDetailById) => {
  try {
    const data = await tenantSettingRepository.findOne({
      where: { id: String(params.id) },
    });
    return ApiUtility.sanitizeData(data);
  } catch (e) {
    return null;
  }
};

const update = async (params: IUpdateTenantSetting) => {
  const query = { ...where, id: params.id };

  const tenantSetting = await tenantSettingRepository.find({ where: query });
  if (!tenantSetting) {
    throw new StringError('Tenant setting not found');
  }

  return await tenantSettingRepository.update(query, {
    name: params.name,
    fields: JSON.parse(JSON.stringify(params.fields)) as Field[],
    tenantId: params.tenantId,
    updatedAt: DateTimeUtility.getCurrentTimeStamp(),
  });
};

const list = async (req: any) => {
  let tenantSettingRepo = ApiUtility.initQueryBuilder(tenantSettingRepository, 'tenant_settings', false);

  const start = parseInt(ApiUtility.getQueryParam(req, '_start'), 10) || 0;
  const end = parseInt(ApiUtility.getQueryParam(req, '_end'), 10) || 10;
  const keyword = ApiUtility.getQueryParam(req, 'keyword');
  const limit = end - start;
  const skip = start;
  const params: ITenantSettingQueryParams = { limit, skip, keyword };

  if (params.keyword) {
    tenantSettingRepo = tenantSettingRepo.andWhere(
      '(LOWER(tenant_settings.name) LIKE LOWER(:keyword) OR LOWER(tenant_settings.region) LIKE LOWER(:keyword))',
      { keyword: `%${params.keyword}%` },
    );
  }

  tenantSettingRepo = ApiUtility.paginate(tenantSettingRepo, params);
  const tenantSettings = await tenantSettingRepo.getMany();

  const response = [];
  const totalCount = tenantSettings.length;

  if (tenantSettings && tenantSettings.length) {
    for (const item of tenantSettings) {
      response.push(ApiUtility.sanitizeData(item));
    }
  }

  return { response, totalCount };
};

const remove = async (params: IDeleteById) => {
  const query = { ...where, id: String(params.id) };

  const tenantSetting = await AppDataSource.manager.getRepository(TenantSettings).find({ where: query });
  if (!tenantSetting) {
    throw new StringError('Tenant settings not found');
  }

  return await AppDataSource.manager.getRepository(TenantSettings).update(query, {
    isDeleted: true,
    updatedAt: DateTimeUtility.getCurrentTimeStamp(),
  });
};

export default {
  create,
  getById,
  update,
  list,
  remove,
};
