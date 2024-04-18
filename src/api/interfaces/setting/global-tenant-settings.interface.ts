interface ICreateGlobalTenantSetting {
  name?: string;
  fields?: any;
  tenantId?: string;
}

interface IUpdateGlobalTenantSetting {
  id: string;
  name?: string;
  fields?: string;
  tenantId?: string;
}

interface ITenantGlobalSettingQueryParams {
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

export { ICreateGlobalTenantSetting, IUpdateGlobalTenantSetting, ITenantGlobalSettingQueryParams, Field };
