import { Request } from 'express';

// Entities
import { Users } from '../api/entities/user/user.entity';
import { BaseEntity } from '../api/entities/base/base.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

export default class ApiUtility {
  static getCookieFromRequest(req: Request, key: string) {
    if (req.headers.authorization) {
      return req.headers.authorization;
    }

    if (req.headers.cookie) {
      const results = req.headers.cookie.split(';');
      const filtered = results.filter((result: string) => {
        return result.startsWith(`${key}=`);
      });

      if (filtered.length > 0) {
        return filtered[0].split('=')[1];
      }
    }

    return null;
  }

  static sanitizeData(data: BaseEntity) {
    const { createdAt, updatedAt, ...basicData } = data;
    return basicData;
  }

  static sanitizeUser(user: Users) {
    const { password, isDeleted, ...basicUser } = user;
    return basicUser;
  }

  static getQueryParam(req: any, type: string) {
    if (req && type && type !== '') {
      switch (type) {
        case 'limit': {
          return req.query.limit ? parseInt(req.query.limit.toString(), 10) : 5;
        }
        case 'page': {
          return req.query.page ? parseInt(req.query.page.toString(), 10) : 1;
        }
        default: {
          return req.query[type] ? req.query[type] : null;
        }
      }
    }
    return null;
  }

  static getOffset(limit: number, page: number) {
    return limit * page - limit;
  }

  // Function to initialize the query builder
  static initQueryBuilder = (repository: Repository<any>, entityName: string, isDeleted: boolean) => {
    let repo = repository.createQueryBuilder(entityName);
    repo = repo.where(`${entityName}.isDeleted = :isDeleted`, {
      isDeleted: isDeleted,
    });
    return repo;
  };

  // Function to implement pagination
  static paginate = (repository: SelectQueryBuilder<any>, params: any) => {
    const limit = params.limit;
    const skip = params.skip;
    return repository.limit(limit).offset(skip);
  };
}
