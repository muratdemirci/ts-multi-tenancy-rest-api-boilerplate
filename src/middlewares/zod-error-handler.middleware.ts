import express from 'express';
import * as HttpStatus from 'http-status-codes';
import { ZodError } from 'zod';

interface IZodErrorDetail {
  message?: string;
  path?: string[];
}

interface IZodError extends Error {
  format?: () => IZodErrorDetail[];
}

export default (err: IZodError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof ZodError) {
    const error = {
      code: HttpStatus.BAD_REQUEST,
      message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
      details: err.format().map((err) => ({
        message: err.message,
        param: err.path?.join('.') ?? '',
      })),
    };
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }

  return next(err);
};
