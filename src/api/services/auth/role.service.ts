// Utilities
import ApiUtility from '../../../utilities/api.utility';
// Interfaces
import { IDetailById } from 'common.interface';

// Entities
import { AuthRole } from '../../entities/auth/auth-roles.entity';

// Data Source
import { AppDataSource } from '../../../configs/database.config';

// Constants
const where = { isDeleted: false };
const authRoleRepository = AppDataSource.manager.getRepository(AuthRole);

const getById = async (params: IDetailById) => {
  try {
    const data = await authRoleRepository.findOne({
      where: { id: String(params.id) },
    });
    return ApiUtility.sanitizeData(data);
  } catch (e) {
    return null;
  }
};

export default {
  getById,
};
