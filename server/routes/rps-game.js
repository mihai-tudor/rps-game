import Router from 'koa-router';
import * as RpsGameController from '../controllers/rps-game';

const router = new Router();

router.get('/game/:id', RpsGameController.gamePage);
router.get('/404', RpsGameController.error404);

module.exports = router.routes();
