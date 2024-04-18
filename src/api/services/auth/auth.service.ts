// Entities
import { AuthRole } from '../../entities/auth/auth-roles.entity';
import { UserRole } from '../../entities/auth/user-roles.entity';
import { Users } from '../../entities/user/user.entity';

// Utilities
import ApiUtility from '../../../utilities/api.utility';
import DateTimeUtility from '../../../utilities/date-time.utility';

// Interfaces
import { IAssignRole } from '../../interfaces/user/user.interface';

// Errors
import { StringError } from '../../../errors/string.error';

// Data Source
import { AppDataSource } from '../../../configs/database.config';

// Services

import userService from '../user/user.service';
import roleService from './role.service';
import { Equal } from 'typeorm';

// Constants
const where = { isDeleted: false };
const userRoleRepository = AppDataSource.manager.getRepository(UserRole);
const userRepository = AppDataSource.manager.getRepository(Users);

const assignRole = async (params: IAssignRole) => {
  const user = await userService.getById({ id: params.userId });
  if (!user) {
    throw new StringError('User not found');
  }
  delete user.roleId;

  const role = await roleService.getById({ id: params.roleId });
  if (!role) {
    throw new StringError('Role not found');
  }

  const userRole = new UserRole();
  userRole.user = user as any;
  userRole.role = role as any;

  const userRolesData = await upsertUserRole(userRole);

  const query = { ...where, id: String(user.id) };

  // Update the user's role
  await userRepository.update(query, {
    roleId: params.roleId,
    updatedAt: DateTimeUtility.getCurrentTimeStamp(),
  });

  const userData: any = {
    user,
    role: userRolesData.role.name,
  };

  return ApiUtility.sanitizeData(userData);
};

const unAssignRole = async (params: IAssignRole) => {
  const user = await userService.getById({ id: params.userId });
  if (!user) {
    throw new StringError('User not found');
  }
  delete user.roleId;

  const role = await roleService.getById({ id: params.roleId });
  if (!role) {
    throw new StringError('Role not found');
  }

  const query = { ...where, id: String(user.id) };

  // Update the user's role
  await userRepository.update(query, {
    roleId: null,
    updatedAt: DateTimeUtility.getCurrentTimeStamp(),
  });

  const userData: any = {
    user,
    role: 'No Role',
  };

  return ApiUtility.sanitizeData(userData);
};

const getUserRoles = async (userId: string) => {
  const existingUserRole = await userRoleRepository.findOne({
    where: { user: Equal(userId) },
    relations: ['user', 'role'],
  });

  if (!existingUserRole) {
    return 'User not found or has no role assigned';
  }

  return existingUserRole.role.name;
};

async function upsertUserRole(userRole: UserRole) {
  const existingUserRole = await userRoleRepository.findOne({ where: { user: Equal(userRole.user.id) } });

  if (existingUserRole) {
    // If the user role exists, update it
    const updatedUserRole = { ...existingUserRole, role: userRole.role };
    await userRoleRepository.update(existingUserRole.id, updatedUserRole);
    return updatedUserRole;
  } else {
    // If the user role doesn't exist, insert it
    return await userRoleRepository.save(userRole);
  }
}

export default {
  assignRole,
  unAssignRole,
  getUserRoles,
};
