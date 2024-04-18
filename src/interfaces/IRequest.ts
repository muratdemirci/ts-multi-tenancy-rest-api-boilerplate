import { Request } from 'express';
import { Users } from '../api/entities/user/user.entity';
export default interface IRequest extends Request {
  users: Users;
}
