export interface IDeleteById {
  id: string;
}

export interface IDetailById {
  id: string;
}

export interface IBaseQueryParams {
  limit: number;
  page?: number;
}

export interface IOverrideRequest {
  code: number;
  message: string;
  positive: string;
  negative: string;
}

export interface ICookie {
  key: string;
  value: string;
}
