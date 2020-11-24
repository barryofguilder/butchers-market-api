import Router from 'koa-router';

import status from './status';
import deliItem from './deli-item';
import event from './event';
import feedback from './feedback';
import hour from './hour';
import meatBundle from './meat-bundle';
import packageBundle from './package-bundle';
import performance from './performance';
import review from './review';
import special from './special';
import token from './token';
import upload from './upload';

import NAMESPACE from '../constants/namespace';

const router = new Router();

router.use(`${NAMESPACE}/`, status);
router.use(`${NAMESPACE}/deli-items`, deliItem);
router.use(`${NAMESPACE}/events`, event);
router.use(`${NAMESPACE}/feedback`, feedback);
router.use(`${NAMESPACE}/hours`, hour);
router.use(`${NAMESPACE}/meat-bundles`, meatBundle);
router.use(`${NAMESPACE}/package-bundles`, packageBundle);
router.use(`${NAMESPACE}/performances`, performance);
router.use(`${NAMESPACE}/reviews`, review);
router.use(`${NAMESPACE}/specials`, special);
router.use(`${NAMESPACE}/token`, token);
router.use(`${NAMESPACE}/upload`, upload);

export default router;
