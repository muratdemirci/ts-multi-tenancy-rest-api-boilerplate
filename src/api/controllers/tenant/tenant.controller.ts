import httpStatusCodes from 'http-status-codes';

// Interfaces
import IController from '../../../interfaces/IController';

// Services
import tenantService from '../../services/tenant/tenant.service';
import userService from '../../services/user/user.service';

// Utilities
import ApiResponse from '../../../utilities/api-response.utility';
import ApiUtility from '../../../utilities/api.utility';

// Constants
import constants from '../../../constants';

// Interfaces
import {
  IAssignUser,
  ICreateTenant,
  ITenantQueryParams,
  IUpdateTenant,
} from '../../interfaces/tenant/tenant.interface';
import { IDeleteById, IDetailById } from 'common.interface';

const create: IController = async (req, res) => {
  try {
    const params: ICreateTenant = {
      name: req.body.name,
      status: req.body.status,
      domains: req.body.domains,
      users: req.body.users,
    };
    const tenant = await tenantService.create(params);
    return ApiResponse.result(res, tenant, httpStatusCodes.CREATED);
  } catch (e) {
    if (e.code === constants.ERROR_CODE.DUPLICATED) {
      return ApiResponse.error(res, httpStatusCodes.CONFLICT, 'Tenant already exists.');
    }
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const getById: IController = async (req, res) => {
  try {
    const params: IDetailById = {
      id: req.params.id,
    };
    const tenant = await tenantService.getById(params);
    return ApiResponse.result(res, tenant, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const update: IController = async (req, res) => {
  try {
    const params: IUpdateTenant = {
      name: req.body.name,
      status: req.body.status,
      domains: req.body.domains,
      users: req.body.users,
      id: req.params.id,
    };
    await tenantService.update(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const list: IController = async (req, res) => {
  try {
    const start = parseInt(ApiUtility.getQueryParam(req, '_start'), 10) || 0;
    const end = parseInt(ApiUtility.getQueryParam(req, '_end'), 10) || 10;
    const keyword = ApiUtility.getQueryParam(req, 'keyword');
    const limit = end - start;
    const skip = start;
    const params: ITenantQueryParams = { limit, skip, keyword };

    const data = await tenantService.list(params);
    const totalCount = data.totalCount;

    return ApiResponse.result(res, data.response, httpStatusCodes.OK, null, totalCount);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const remove: IController = async (req, res) => {
  try {
    const params: IDeleteById = {
      id: req.params.id,
    };
    await tenantService.remove(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const assignUser: IController = async (req, res) => {
  try {
    const params: IAssignUser = {
      tenantId: req.body.tenantId,
      userId: req.body.userId,
    };

    if (await tenantService.isUserAssignedToTenant(params.tenantId, params.userId)) {
      return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, 'User is already assigned to this tenant');
    }

    const tenant = await tenantService.assignUser(params);
    return ApiResponse.result(res, tenant, httpStatusCodes.CREATED);
  } catch (e) {
    if (e.message === 'Tenant or user not found') {
      return ApiResponse.error(res, httpStatusCodes.NOT_FOUND, 'Tenant or user not found');
    }
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const unassignUser: IController = async (req, res) => {
  try {
    const params: IAssignUser = {
      tenantId: req.body.tenantId,
      userId: req.body.userId,
    };

    if (!(await tenantService.isUserAssignedToTenant(params.tenantId, params.userId))) {
      return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, 'User is not assigned to this tenant');
    }

    const tenant = await tenantService.unassignUser(params);
    return ApiResponse.result(res, tenant, httpStatusCodes.OK);
  } catch (e) {
    if (e.message === 'Tenant or user not found') {
      return ApiResponse.error(res, httpStatusCodes.NOT_FOUND, 'Tenant or user not found');
    }
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const retrieveUsers: IController = async (req, res) => {
  try {
    const data = await tenantService.listUsers(req);
    const totalCount = data.totalCount;

    return ApiResponse.result(res, data.response, httpStatusCodes.OK, null, totalCount);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const userExists: IController = async (req, res) => {
  try {
    const tenantId = req.params.tenantId;
    const userId = req.params.userId;

    const tenant = await tenantService.getById({ id: tenantId });

    if (!tenant) {
      return ApiResponse.error(res, httpStatusCodes.NOT_FOUND, 'Tenant not found');
    }

    const userExists = await userService.getUserInTenant(userId, tenantId);

    if (userExists) {
      return ApiResponse.result(res, { message: 'User exists in tenant' }, httpStatusCodes.OK);
    } else {
      return ApiResponse.error(res, httpStatusCodes.NOT_FOUND, 'User not found in tenant');
    }
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

export default {
  create,
  getById,
  update,
  list,
  remove,
  assignUser,
  unassignUser,
  retrieveUsers,
  userExists,
};
