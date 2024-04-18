import * as express from 'express';

import defaultRouter from '../api/default/default.route';
import authRouter from '../api/auth/auth.route';
import userRouter from '../api/user/user.route';
import tenantRouter from '../api/tenant/tenant.route';
import settingsTenantRouter from '../api/setting/tenant-settings.route';
import globalSettingTenantRouter from '../api/setting/global-tenant-settings.route';

const router = express.Router();

router.use('/', defaultRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/tenants', tenantRouter);
router.use('/settings/tenants', settingsTenantRouter);
router.use('/settings/global/tenants', globalSettingTenantRouter);

export default router;
