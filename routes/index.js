import Router from 'koa-router';
import status from './status';
import event from './event';

const router = new Router();

router.use('/', status);
router.use('/events', event);

export default router;
