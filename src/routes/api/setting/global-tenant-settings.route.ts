import express from 'express';

// Middleware
import { checkRoles } from '../../../middlewares/permission-handler.middleware';
import schemaValidator from '../../../middlewares/zod-schema-validator.middleware';

// Controller
import globalSettingsController from '../../../api/controllers/settings/global-settings.controller';

// Schema
import settingsSchema from '../../../validations/schemas/settings.schema';

const router = express.Router();

router.get('/info', checkRoles(['SUPERADMIN']), globalSettingsController.getConstantGlobalSetting);
router.put(
  '/:id',
  checkRoles(['SUPERADMIN']),
  schemaValidator(settingsSchema.tenantSettingUpdate),
  globalSettingsController.updateTenantSettings,
);

export default router;
