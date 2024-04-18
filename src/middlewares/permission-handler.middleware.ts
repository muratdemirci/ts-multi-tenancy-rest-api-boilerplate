import express from 'express';
import httpStatusCodes from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Interfaces
import IRequest from '../interfaces/IRequest';

// Utilities
import ApiResponse from '../utilities/api-response.utility';
import userService from '../api/services/user/user.service';
import authService from '../api/services/auth/auth.service';

export const checkRoles = (roles: string[]) => {
  return async (req: IRequest, res: express.Response, next: express.NextFunction) => {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1]; // Bearer <token>

      const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY) as JwtPayload;

      if (decoded) {
        const user = await userService.getById({
          id: decoded.id,
        });

        const userRoles = await authService.getUserRoles(user.id);

        // check if user has the required role
        if (!roles.some((role) => userRoles.includes(role))) {
          return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
        }
      }

      next();
    }
  };
};
