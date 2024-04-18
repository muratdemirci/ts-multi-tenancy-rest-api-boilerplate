import httpStatusCodes from 'http-status-codes';
// Interfaces
import IController from '../../../interfaces/IController';
import { IUpdateUser } from '../../interfaces/user/user.interface';
import { IDeleteById } from '../../../interfaces/common.interface';

// Services
import userService from '../../services/user/user.service';
import authService from '../../services/auth/auth.service';

// Utilities
import ApiResponse from '../../../utilities/api-response.utility';

const getProfile: IController = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.getById({ id: userId });

    if (!user) {
      return ApiResponse.error(res, httpStatusCodes.NOT_FOUND, 'User not found');
    }

    return ApiResponse.result(res, user, httpStatusCodes.OK);
  } catch (error) {
    return ApiResponse.error(
      res,
      httpStatusCodes.INTERNAL_SERVER_ERROR,
      'An error occurred while retrieving user profile.',
    );
  }
};

const update: IController = async (req, res) => {
  try {
    const params: IUpdateUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      timezone: req.body.timezone,
      id: req.params.userId,
    };
    await userService.update(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const updateProfile: IController = async (req, res) => {
  try {
    const params: IUpdateUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      timezone: req.body.timezone,
      id: req.params.id,
    };
    await userService.update(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const list: IController = async (req, res) => {
  try {
    const data = await userService.list(req);
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
    await userService.remove(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const retrieveTenantsByUserId: IController = async (req, res) => {
  try {
    const userId = req.params.id;
    const tenants = await userService.getTenantsByUserId(userId);

    return ApiResponse.result(res, tenants, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const getUserRoles: IController = async (req, res) => {
  try {
    const userId = req.params.id;
    const roles = await authService.getUserRoles(userId);

    return ApiResponse.result(res, { roles }, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

export default {
  getProfile,
  update,
  updateProfile,
  list,
  remove,
  retrieveTenantsByUserId,
  getUserRoles,
};
