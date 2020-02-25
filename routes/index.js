import Router from 'koa-router';
import status from './status';
import event from './event';
import upload from './upload';

import NAMESPACE from '../constants/namespace';

const router = new Router();

router.use(`${NAMESPACE}/`, status);
router.use(`${NAMESPACE}/events`, event);
router.use(`${NAMESPACE}/upload`, upload);

export default router;
