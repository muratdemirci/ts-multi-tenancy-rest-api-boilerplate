import constants from '../constants';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// TODO: change bcrypt to argon https://www.npmjs.com/package/argon2

export default class Encryption {
  static async generateHash(password: string, saltRounds: number): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err: any, hash: string) => {
        if (!err) {
          resolve(hash);
        }
        reject(err);
      });
    });
  }

  static async verifyHash(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (_err: any, result: boolean) => {
        if (result) {
          resolve(true);
        }
        resolve(false);
      });
    });
  }

  static async generateCookie(key: string, value: string) {
    const data: { [key: string]: string } = {};
    data[key] = value;
    return await jwt.sign({ data }, constants.APPLICATION.env.authSecret, {
      expiresIn: constants.APPLICATION.timers.userCookieExpiry,
    });
  }

  static async generateAccessToken(payload: object) {
    return await jwt.sign(payload, constants.APPLICATION.env.authSecret, {
      expiresIn: constants.APPLICATION.timers.accessTokenExpiry,
    });
  }

  static async verifyAccessToken(accessToken: string): Promise<boolean> {
    if (!accessToken) {
      console.error('No access token provided');
      return false;
    }

    try {
      jwt.verify(accessToken, constants.APPLICATION.env.authSecret);
      return true;
    } catch (error) {
      // If the token is not valid or expired, jwt.verify will throw an error
      console.error('Error verifying access token:', error);
      return false;
    }
  }

  static async verifyCookie(token: string): Promise<any> {
    return new Promise((resolve) => {
      jwt.verify(token, constants.APPLICATION.env.authSecret, (err: Error, decoded: any) => {
        if (err) {
          resolve(null);
        } else {
          resolve(decoded);
        }
      });
    });
  }
}
