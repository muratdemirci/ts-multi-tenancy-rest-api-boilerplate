import { Response } from 'express';
import httpStatusCodes from 'http-status-codes';

// Interfaces
import { ICookie, IOverrideRequest } from '../interfaces/common.interface';

// Errors
import { StringError } from '../errors/string.error';

export default class ApiResponse {
  static result = (
    res: Response,
    data: object,
    status: number = 200,
    cookie: ICookie | null = null,
    totalCount: number = 0,
  ) => {
    res.status(status);
    if (cookie) {
      res.cookie(cookie.key, cookie.value);
    }

    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.append('X-Total-Count', totalCount.toString());

    let responseData: any = data;

    res.json(responseData);
  };

  static error = (
    res: Response,
    status = 400,
    error = httpStatusCodes.getStatusText(status),
    override: IOverrideRequest | null = null,
    err: Error | null = null,
  ) => {
    let errorResponse = {
      override,
      error: {
        message: error,
        stack: null as string | null | undefined,
      },
    };

    if (process.env.NODE_ENV === 'development' && err !== null) {
      errorResponse.error.stack = err.stack;
    }

    res.status(status).json(errorResponse);
  };

  static setCookie = (res: Response, key: string, value: string) => {
    res.cookie(key, value);
  };

  static exception(res: Response, error: any) {
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (error instanceof StringError) {
      return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, error.message, null, isDevelopment ? error : null);
    }

    return ApiResponse.error(
      res,
      httpStatusCodes.BAD_REQUEST,
      'Something went wrong',
      null,
      isDevelopment ? error : null,
    );
  }
}
