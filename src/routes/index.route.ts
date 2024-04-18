import express, { response } from 'express';
import api from './api';

const router = express.Router();
const apiPrefix = `/${process.env.API_PREFIX}` || 'api';

router.use(apiPrefix, api);
export default router;
