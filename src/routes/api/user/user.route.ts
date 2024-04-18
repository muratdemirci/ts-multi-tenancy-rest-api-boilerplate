import express from 'express';
// Controller
import userController from '../../../api/controllers/user/user.controller';

// Schema
import userSchema from '../../../validations/schemas/user.schema';

// Middleware
import { checkRoles } from '../../../middlewares/permission-handler.middleware';
import schemaValidator from '../../../middlewares/zod-schema-validator.middleware';

const router = express.Router();

router.get('/', schemaValidator(userSchema.list), checkRoles(['SUPERADMIN']), userController.list);

router.put(
  '/info/:id',
  schemaValidator(userSchema.updateProfile),
  checkRoles(['SUPERADMIN']),
  userController.updateProfile,
);

router.get('/info/:id', schemaValidator(userSchema.getProfile), checkRoles(['SUPERADMIN']), userController.getProfile);

router.get(
  '/profile/:id',
  schemaValidator(userSchema.getProfile),
  checkRoles(['USER', 'TENANTUSER', 'TENANTADMIN', 'SUPERADMIN']),
  userController.getProfile,
);

router.put(
  '/profile/:id',
  schemaValidator(userSchema.updateProfile),
  checkRoles(['USER', 'TENANTUSER', 'TENANTADMIN', 'SUPERADMIN']),
  userController.updateProfile,
);

router.get(
  '/tenants/:id',
  schemaValidator(userSchema.retrieveTenantsByUserId),
  checkRoles(['SUPERADMIN', 'TENANTADMIN']),
  userController.retrieveTenantsByUserId,
);

router.get(
  '/roles/:id',
  schemaValidator(userSchema.gerUserRoles),
  checkRoles(['USER', 'TENANTUSER', 'TENANTADMIN', 'SUPERADMIN']),
  userController.getUserRoles,
);

router.delete('/:id', schemaValidator(userSchema.remove), checkRoles(['SUPERADMIN']), userController.remove);

export default router;
