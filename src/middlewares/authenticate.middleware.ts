import express from 'express';
import httpStatusCodes from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Services
import userService from '../api/services/user/user.service';

// Interfaces
import IRequest from '../interfaces/IRequest';

// Utilities
import ApiResponse from '../utilities/api-response.utility';
// Constants
import constants from '../constants';

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const basePath = constants.APPLICATION.url.basePath;
  let pathsToCheck = constants.APPLICATION.authorizationIgnorePath;

  // If the basePath is not the root path
  if (basePath !== '/') {
    // Map over the original array and prepend basePath to each path
    pathsToCheck = pathsToCheck.map((path) => basePath + path);
    pathsToCheck.push('/favicon.ico');
    pathsToCheck.push('/');
  }

  // If the current request's URL is not in the pathsToCheck array
  if (pathsToCheck.indexOf(`${req.originalUrl}`) === -1) {
    const authorizationHeader = req.headers.authorization;

    // If the authorizationHeader exists (i.e., it's not undefined or null)
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1]; // Bearer <token>

      try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY) as JwtPayload;

        const user = await userService.getById({
          id: decoded.id,
        });
        // If the user exists
        if (user) {
          // @ts-ignore
          req.user = user;
        } else {
          return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
        }
      } catch (err) {
        // If the token is invalid
        return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
      }
    } else {
      // If the authorizationHeader does not exist
      return ApiResponse.error(res, httpStatusCodes.FORBIDDEN);
    }
  }

  next();
};
