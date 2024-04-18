import httpStatusCodes from 'http-status-codes';

// Interfaces
import IController from '../../../interfaces/IController';
import { ICreateTenantSetting, IUpdateTenantSetting } from '../../interfaces/setting/tenant-settings.interface';

// Services
import tenantSettingsService from '../../services/settings/tenant-settings.service';
import tenantService from '../../services/tenant/tenant.service';

// Utilities
import ApiResponse from '../../../utilities/api-response.utility';

// Constants
import constants from '../../../constants';
import { IDeleteById } from 'common.interface';

const create: IController = async (req, res) => {
  try {
    const params: ICreateTenantSetting = {
      name: req.body.name,
      fields: req.body.fields,
      tenantId: req.body.tenantId,
    };

    const setting = await tenantSettingsService.create(params);
    return ApiResponse.result(res, setting, httpStatusCodes.CREATED);
  } catch (e) {
    if (e.code === constants.ERROR_CODE.DUPLICATED) {
      return ApiResponse.error(res, httpStatusCodes.CONFLICT, 'Tenant setting is already exists.');
    }
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const list: IController = async (req, res) => {
  try {
    const data = await tenantSettingsService.list(req);
    const totalCount = data.totalCount;

    return ApiResponse.result(res, data.response, httpStatusCodes.OK, null, totalCount);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const getById: IController = async (req, res) => {
  try {
    const settingId = req.params.id;
    const tenantSetting = await tenantSettingsService.getById({ id: settingId });

    if (!tenantSetting) {
      return ApiResponse.error(res, httpStatusCodes.NOT_FOUND, 'Tenant setting not found');
    }

    return ApiResponse.result(res, tenantSetting, httpStatusCodes.OK);
  } catch (error) {
    return ApiResponse.error(
      res,
      httpStatusCodes.INTERNAL_SERVER_ERROR,
      'An error occurred when getting tenant setting by id.',
    );
  }
};

const update: IController = async (req, res) => {
  try {
    const params: IUpdateTenantSetting = {
      name: req.body.name,
      fields: req.body.fields,
      tenantId: req.body.tenantId,
      id: req.params.id,
    };
    await tenantSettingsService.update(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const deleteTenantSetting: IController = async (req, res) => {
  const params: IDeleteById = {
    id: req.params.id,
  };

  await tenantSettingsService.remove(params);

  return ApiResponse.result(res, null, httpStatusCodes.NO_CONTENT);
};

export default {
  create,
  list,
  getById,
  update,
  delete: deleteTenantSetting,
};
