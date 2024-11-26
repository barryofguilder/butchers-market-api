import Router from 'koa-router';

import status from './status';
import deliItem from './deli-item';
import featureFlag from './feature-flag';
import feedback from './feedback';
import grabAndGo from './grab-and-go';
import hour from './hour';
import meatBundle from './meat-bundle';
import menu from './menu';
import packageBundle from './package-bundle';
import review from './review';
import special from './special';
import token from './token';
import upload from './upload';

import NAMESPACE from '../constants/namespace';

const router = new Router();

router.use(`${NAMESPACE}/`, status);
router.use(`${NAMESPACE}/deli-items`, deliItem);
router.use(`${NAMESPACE}/feature-flags`, featureFlag);
router.use(`${NAMESPACE}/feedback`, feedback);
router.use(`${NAMESPACE}/grab-and-gos`, grabAndGo);
router.use(`${NAMESPACE}/hours`, hour);
router.use(`${NAMESPACE}/meat-bundles`, meatBundle);
router.use(`${NAMESPACE}/menus`, menu);
router.use(`${NAMESPACE}/package-bundles`, packageBundle);
router.use(`${NAMESPACE}/reviews`, review);
router.use(`${NAMESPACE}/specials`, special);
router.use(`${NAMESPACE}/token`, token);
router.use(`${NAMESPACE}/upload`, upload);

export default router;
