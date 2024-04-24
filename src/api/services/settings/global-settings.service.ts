// Entities
import { GlobalTenantSettings } from '../../entities/settings/global-tenant-settings.entity';
import { VersionSettings } from '../../entities/settings/version-settings.entity';

// Utilities
import ApiUtility from '../../../utilities/api.utility';
import DateTimeUtility from '../../../utilities/date-time.utility';

// Interfaces
import { IUpdateGlobalTenantSetting, Field } from '../../interfaces/setting/global-tenant-settings.interface';
import {
  ICreateVersionSetting,
  IGetVersionSetting,
  IUpdateVersionSetting,
  IVersionSettingQueryParams,
} from '../../interfaces/setting/version-settings.interface';

// Errors
import { StringError } from '../../../errors/string.error';

// Data Source
import { AppDataSource } from '../../../configs/database.config';
import { IDeleteById } from 'common.interface';

// Constants
const where = { isDeleted: false };
const globalTenantSettingsRepository = AppDataSource.manager.getRepository(GlobalTenantSettings);
const versionSettingsRepository = AppDataSource.manager.getRepository(VersionSettings);

const getConstantGlobalSetting = async () => {
  try {
    const tenantSetting = await globalTenantSettingsRepository.find();

    if (!tenantSetting) {
      throw new StringError('Tenant setting not found');
    }

    return ApiUtility.sanitizeData(tenantSetting[0]); // Pass the first BaseEntity object to the sanitizeData function
  } catch (e) {
    console.log(`constantGlobalSetting: ${JSON.stringify(e)}`);
    throw new StringError('An error occurred while fetching the tenant setting');
  }
};

const updateTenantSettings = async (params: IUpdateGlobalTenantSetting) => {
  const query = { ...where, id: params.id };

  const tenantSetting = await globalTenantSettingsRepository.find({ where: query });
  if (!tenantSetting) {
    throw new StringError('Tenant setting not found');
  }

  return await globalTenantSettingsRepository.update(query, {
    name: params.name,
    fields: JSON.parse(JSON.stringify(params.fields)) as Field[],
    updatedAt: DateTimeUtility.getCurrentTimeStamp(),
  });
};

const createVersion = async (params: ICreateVersionSetting) => {
  const item = new VersionSettings();
  item.name = params.name;
  item.changelog = params.changelog;
  item.versionNumber = params.versionNumber;
  item.buildDate = params.buildDate;
  item.buildNumber = params.buildNumber;
  item.revision = params.revision;
  const settingData = await versionSettingsRepository.save(item);
  return ApiUtility.sanitizeData(settingData);
};

const getVersionById = async (params: IGetVersionSetting) => {
  try {
    const data = await versionSettingsRepository.findOne({
      where: { id: String(params.id) },
    });
    if (data) {
      return ApiUtility.sanitizeData(data);
    }
    return null;
  } catch (e) {
    return null;
  }
};

const updateVersion = async (params: IUpdateVersionSetting) => {
  const query = { ...where, id: params.id };

  const tenantSetting = await versionSettingsRepository.find({ where: query });
  if (!tenantSetting) {
    throw new StringError('Tenant setting not found');
  }

  return await versionSettingsRepository.update(query, {
    name: params.name,
    changelog: params.changelog,
    versionNumber: params.versionNumber,
    buildDate: params.buildDate,
    buildNumber: params.buildNumber,
    revision: params.revision,
    updatedAt: DateTimeUtility.getCurrentTimeStamp(),
  });
};

const listVersions = async (req: any) => {
  let versionSettingRepo = ApiUtility.initQueryBuilder(versionSettingsRepository, 'version_settings', false);

  const start = parseInt(ApiUtility.getQueryParam(req, '_start'), 10) || 0;
  const end = parseInt(ApiUtility.getQueryParam(req, '_end'), 10) || 10;
  const keyword = ApiUtility.getQueryParam(req, 'keyword');
  const limit = end - start;
  const skip = start;
  const params: IVersionSettingQueryParams = { limit, skip, keyword };

  if (params.keyword) {
    versionSettingRepo = versionSettingRepo.andWhere(
      '(LOWER(tenant_settings.name) LIKE LOWER(:keyword) OR LOWER(tenant_settings.region) LIKE LOWER(:keyword))',
      { keyword: `%${params.keyword}%` },
    );
  }

  versionSettingRepo = ApiUtility.paginate(versionSettingRepo, params);
  const tenantSettings = await versionSettingRepo.getMany();

  const response = [];
  const totalCount = tenantSettings.length;

  if (tenantSettings && tenantSettings.length) {
    for (const item of tenantSettings) {
      response.push(ApiUtility.sanitizeData(item));
    }
  }

  return { response, totalCount };
};

const removeVersion = async (params: IDeleteById) => {
  const query = { ...where, id: String(params.id) };

  const tenantSetting = await AppDataSource.manager.getRepository(VersionSettings).find({ where: query });
  if (!tenantSetting) {
    throw new StringError('Tenant settings not found');
  }

  return await AppDataSource.manager.getRepository(VersionSettings).update(query, {
    isDeleted: true,
    updatedAt: DateTimeUtility.getCurrentTimeStamp(),
  });
};

export default {
  getConstantGlobalSetting,
  updateTenantSettings,
  createVersion,
  getVersionById,
  updateVersion,
  listVersions,
  removeVersion,
};
