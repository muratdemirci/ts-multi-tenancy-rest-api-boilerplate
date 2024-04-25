import httpStatusCodes from 'http-status-codes';

// Interfaces
import IController from '../../../interfaces/IController';
import { IUpdateTenantSetting } from '../../interfaces/setting/tenant-settings.interface';
import {
  ICreateVersionSetting,
  IDeleteVersionSetting,
  IUpdateVersionSetting,
} from '../../interfaces/setting/version-settings.interface';

// Services
import globalSettingsService from '../../services/settings/global-settings.service';

// Utilities
import ApiResponse from '../../../utilities/api-response.utility';

// Constants
import constants from '../../../constants';

const getConstantGlobalSetting: IController = async (req, res) => {
  try {
    const tenantSetting = await globalSettingsService.getConstantGlobalSetting();

    return ApiResponse.result(res, tenantSetting, httpStatusCodes.OK);
  } catch (error) {
    return ApiResponse.error(
      res,
      httpStatusCodes.INTERNAL_SERVER_ERROR,
      'An error occurred when getting global tenant setting',
    );
  }
};

const updateTenantSettings: IController = async (req, res) => {
  try {
    const params: IUpdateTenantSetting = {
      name: req.body.name,
      fields: req.body.fields,
      id: req.params.id,
    };

    await globalSettingsService.updateTenantSettings(params);

    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const createVersion: IController = async (req, res) => {
  try {
    const params: ICreateVersionSetting = {
      name: req.body.name,
      changelog: req.body.changelog,
      versionNumber: req.body.versionNumber,
      buildDate: req.body.buildDate,
      buildNumber: req.body.buildNumber,
      revision: req.body.revision,
    };

    const version = await globalSettingsService.createVersion(params);
    return ApiResponse.result(res, version, httpStatusCodes.CREATED);
  } catch (e) {
    if (typeof e === 'object' && e !== null && 'code' in e && e.code === constants.ERROR_CODE.DUPLICATED) {
      return ApiResponse.error(res, httpStatusCodes.CONFLICT, 'Versin is already exists.');
    }
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const listVersions: IController = async (req, res) => {
  try {
    const versions = await globalSettingsService.listVersions(req);
    const totalCount = versions.totalCount;

    return ApiResponse.result(res, versions.response, httpStatusCodes.OK, undefined, totalCount);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const getVersionById: IController = async (req, res) => {
  try {
    const versionId = req.params.id;
    const version = await globalSettingsService.getVersionById({ id: versionId });

    if (!version) {
      return ApiResponse.error(res, httpStatusCodes.NOT_FOUND, 'Version not found');
    }

    return ApiResponse.result(res, version, httpStatusCodes.OK);
  } catch (error) {
    return ApiResponse.error(
      res,
      httpStatusCodes.INTERNAL_SERVER_ERROR,
      'An error occurred when getting version by id.',
    );
  }
};

const updateVersion: IController = async (req, res) => {
  try {
    const params: IUpdateVersionSetting = {
      id: req.params.id,
      name: req.body.name,
      changelog: req.body.changelog,
      versionNumber: req.body.versionNumber,
      buildDate: req.body.buildDate,
      buildNumber: req.body.buildNumber,
      revision: req.body.revision,
    };
    await globalSettingsService.updateVersion(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const deleteVersion: IController = async (req, res) => {
  const params: IDeleteVersionSetting = {
    id: req.params.id,
  };

  await globalSettingsService.removeVersion(params);

  return ApiResponse.result(res, {}, httpStatusCodes.NO_CONTENT);
};

export default {
  getConstantGlobalSetting,
  updateTenantSettings,
  createVersion,
  listVersions,
  getVersionById,
  updateVersion,
  deleteVersion,
};
