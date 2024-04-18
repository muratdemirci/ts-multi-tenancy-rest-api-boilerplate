interface ICreateVersionSetting {
  name: string;
  changelog: string;
  versionNumber: string;
  buildDate: Date;
  buildNumber: number;
  revision: number;
}

interface IUpdateVersionSetting {
  id: string;
  name?: string;
  changelog?: string;
  versionNumber?: string;
  buildDate?: Date;
  buildNumber?: number;
  revision?: number;
}

interface IGetVersionSetting {
  id: string;
}

interface IDeleteVersionSetting {
  id: string;
}

interface IVersionSettingQueryParams {
  keyword?: string;
  limit?: number;
  offset?: number;
  skip?: number;
  tenantSettingId?: string;
  tenantId?: string;
}

export {
  ICreateVersionSetting,
  IUpdateVersionSetting,
  IGetVersionSetting,
  IDeleteVersionSetting,
  IVersionSettingQueryParams,
};
