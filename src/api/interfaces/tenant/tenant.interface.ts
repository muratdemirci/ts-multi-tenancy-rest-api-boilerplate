// Interfaces
import { Users } from '../../entities/user/user.entity';
import { IBaseQueryParams } from '../../../interfaces/common.interface';

interface Domain {
  name: any;
  domain: string;
}

interface Tenant {
  name: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  domains: Domain[];
  users: Users[];
}

export interface ICreateTenant extends Tenant {}

export interface IUpdateTenant extends Partial<Tenant> {
  id: string;
}

export interface IAssignUser {
  tenantId: string;
  userId: string;
}

export interface IUnassignUser {
  tenantId: string;
  userId: string;
}

export interface ITenantQueryParams extends IBaseQueryParams {
  keyword?: string;
  tenantId?: string;
  skip?: number;
}
