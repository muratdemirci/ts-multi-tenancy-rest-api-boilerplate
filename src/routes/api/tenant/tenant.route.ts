import express from 'express';
import schemaValidator from '../../../middlewares/zod-schema-validator.middleware';

// Controller
import tenantController from '../../../api/controllers/tenant/tenant.controller';

// Schema
import tenantSchema from '../../../validations/schemas/tenant.schema';

// Middleware
import { checkRoles } from '../../../middlewares/permission-handler.middleware';

const router = express.Router();

router.post('/', schemaValidator(tenantSchema.create), checkRoles(['SUPERADMIN']), tenantController.create);
router.get('/', schemaValidator(tenantSchema.list), checkRoles(['SUPERADMIN', 'TENANTADMIN']), tenantController.list);
router.get(
  '/info/:id',
  schemaValidator(tenantSchema.getById),
  checkRoles(['SUPERADMIN', 'TENANTADMIN']),
  tenantController.getById,
);
router.put(
  '/:id',
  schemaValidator(tenantSchema.update),
  checkRoles(['SUPERADMIN', 'TENANTADMIN']),
  tenantController.update,
);
router.post('/assign-user', checkRoles(['SUPERADMIN', 'TENANTADMIN']), tenantController.assignUser);
router.post('/unassign-user', checkRoles(['SUPERADMIN', 'TENANTADMIN']), tenantController.unassignUser);
router.delete('/:id', schemaValidator(tenantSchema.remove), checkRoles(['SUPERADMIN']), tenantController.remove);
router.get(
  '/:id/users',
  // schemaValidator(tenantSchema.list),
  checkRoles(['SUPERADMIN', 'TENANTADMIN']),
  tenantController.retrieveUsers,
);
router.get(
  '/:tenantId/users/:userId/exists',
  schemaValidator(tenantSchema.list),
  checkRoles(['SUPERADMIN', 'TENANTADMIN']),
  tenantController.userExists,
);

export default router;
