import Router from 'koa-router';
import status from './status';
import event from './event';

import NAMESPACE from '../constants/namespace';

const router = new Router();

router.use(`${NAMESPACE}/`, status);
router.use(`${NAMESPACE}/events`, event);

export default router;
