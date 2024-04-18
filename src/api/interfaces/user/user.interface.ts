// Interfaces
import { IBaseQueryParams } from '../../../interfaces/common.interface';

export interface ICreateUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUpdateUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  timezone: string;
}

export interface IUserQueryParams extends IBaseQueryParams {
  keyword?: string;
  skip?: number;
}

export interface IAssignRole {
  userId: string;
  roleId: string;
}

export interface IAccessToken {
  accessToken: string;
}
