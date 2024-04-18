interface ICreateTenantSetting {
  name?: string;
  fields?: any;
  tenantId?: string;
}

interface IUpdateTenantSetting {
  id: string;
  name?: string;
  fields?: string;
  tenantId?: string;
}

interface ITenantSettingQueryParams {
  keyword?: string;
  limit?: number;
  offset?: number;
  skip?: number;
  tenantSettingId?: string;
  tenantId?: string;
}

interface Field {
  name: string;
  isRequired: boolean;
  value: string;
}

export { ICreateTenantSetting, IUpdateTenantSetting, ITenantSettingQueryParams, Field };
