import Router from 'koa-router';

import status from './status';
import deliItem from './deli-item';
import event from './event';
import hour from './hour';
import meatBundle from './meat-bundle';
import upload from './upload';

import NAMESPACE from '../constants/namespace';

const router = new Router();

router.use(`${NAMESPACE}/`, status);
router.use(`${NAMESPACE}/deli-items`, deliItem);
router.use(`${NAMESPACE}/events`, event);
router.use(`${NAMESPACE}/hours`, hour);
router.use(`${NAMESPACE}/meat-bundles`, meatBundle);
router.use(`${NAMESPACE}/upload`, upload);

export default router;
