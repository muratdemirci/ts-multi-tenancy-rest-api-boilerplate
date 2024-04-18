import httpStatusCodes from 'http-status-codes';

// Interfaces
import IController from '../../../interfaces/IController';
import { IAccessToken, ICreateUser, ILoginUser, IAssignRole } from '../../interfaces/user/user.interface';

// Errors
import { StringError } from '../../../errors/string.error';

// Services
import userService from '../../services/user/user.service';
import authService from '../../services/auth/auth.service';

// Utilities
import ApiResponse from '../../../utilities/api-response.utility';
import Encryption from '../../../utilities/encryption.utility';

// Constants
import constants from '../../../constants';

const createUser: IController = async (req, res) => {
  try {
    const params: ICreateUser = {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
    };
    const user = await userService.create(params);
    return ApiResponse.result(res, user, httpStatusCodes.CREATED);
  } catch (e) {
    if (e.code === constants.ERROR_CODE.DUPLICATED) {
      return ApiResponse.error(res, httpStatusCodes.CONFLICT, 'Email already exists.');
    }
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const login: IController = async (req, res) => {
  try {
    const params: ILoginUser = {
      email: req.body.email,
      password: req.body.password,
    };

    const userWithTokenAndCookie = await userService.login(params);
    return ApiResponse.result(res, userWithTokenAndCookie, httpStatusCodes.OK);
  } catch (e) {
    if (e instanceof StringError) {
      return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
    }
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, 'Something went wrong');
  }
};

const logout: IController = async (req, res) => {
  return ApiResponse.result(res, null, httpStatusCodes.OK);
};

const isAuthenticated: IController = async (req, res) => {
  try {
    const payload: IAccessToken = req.body;
    const result = await Encryption.verifyAccessToken(payload.accessToken);
    return ApiResponse.result(res, { result }, httpStatusCodes.OK);
  } catch (e) {
    if (e instanceof StringError) {
      return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
    }
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, 'Something went wrong');
  }
};

const assignRole: IController = async (req, res) => {
  try {
    const params: IAssignRole = {
      userId: req.body.userId,
      roleId: req.body.roleId,
    };

    const userAssign = await authService.assignRole(params);
    return ApiResponse.result(res, userAssign, httpStatusCodes.OK);
  } catch (e) {
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const unAssignRole: IController = async (req, res) => {
  try {
    const params: IAssignRole = {
      userId: req.body.userId,
      roleId: req.body.roleId,
    };

    const userAssign = await authService.unAssignRole(params);
    return ApiResponse.result(res, userAssign, httpStatusCodes.OK);
  } catch (e) {
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

export default {
  createUser,
  login,
  logout,
  isAuthenticated,
  assignRole,
  unAssignRole,
};
