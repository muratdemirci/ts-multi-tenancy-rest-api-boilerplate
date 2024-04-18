import express from 'express';

// Middleware
import { checkRoles } from '../../../middlewares/permission-handler.middleware';
import schemaValidator from '../../../middlewares/zod-schema-validator.middleware';

// Controller
import tenantSettingsController from '../../../api/controllers/settings/tenant-settings.controller';

// Schema
import settingsSchema from '../../../validations/schemas/settings.schema';

const router = express.Router();

router.post(
  '/',
  checkRoles(['SUPERADMIN']),
  schemaValidator(settingsSchema.tenantSettingcreate),
  tenantSettingsController.create,
);
router.get(
  '/',
  checkRoles(['SUPERADMIN']),
  schemaValidator(settingsSchema.tenantSettinglist),
  tenantSettingsController.list,
);
router.get(
  '/info/:id',
  checkRoles(['SUPERADMIN', 'TENANTADMIN']),
  schemaValidator(settingsSchema.tenantSettingGetById),
  tenantSettingsController.getById,
);
router.put(
  '/:id',
  checkRoles(['SUPERADMIN', 'TENANTADMIN']),
  schemaValidator(settingsSchema.tenantSettingUpdate),
  tenantSettingsController.update,
);
router.delete(
  '/:id',
  checkRoles(['SUPERADMIN']),
  schemaValidator(settingsSchema.tenantSettingDelete),
  tenantSettingsController.delete,
);

export default router;
