import express from 'express';

// Controller
import authController from '../../../api/controllers/auth/auth.controller';

// Schema
import userSchema from '../../../validations/schemas/user.schema';
import authSchema from '../../../validations/schemas/auth.schema';

// Middleware
import { checkRoles } from '../../../middlewares/permission-handler.middleware';
import schemaValidator from '../../../middlewares/zod-schema-validator.middleware';

const router = express.Router();

router.post('/sign-up', schemaValidator(userSchema.register), authController.createUser);

router.post('/sign-in', schemaValidator(userSchema.login), authController.login);

router.post('/sign-out', authController.logout);

router.post('/is-authenticated', schemaValidator(authSchema.isAuthenticated), authController.isAuthenticated);

router.post(
  '/admin/user/create',
  schemaValidator(userSchema.register),
  checkRoles(['SUPERADMIN']),
  authController.createUser,
);

router.post(
  '/admin/user/assign-role',
  schemaValidator(authSchema.assignRole),
  checkRoles(['SUPERADMIN', 'TENANTADMIN']),
  authController.assignRole,
);

router.post(
  '/admin/user/unassign-role',
  schemaValidator(authSchema.unAssignRole),
  checkRoles(['SUPERADMIN', 'TENANTADMIN']),
  authController.unAssignRole,
);

export default router;
