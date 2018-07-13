import Router from 'koa-router';
import * as RpsApiController from '../controllers/rps-api';

const router = new Router();

router.get('/', RpsApiController.findFinishedGames);
router.post('/', RpsApiController.createNewGame);
router.get('/:id', RpsApiController.findGame);
router.post('/:id', RpsApiController.finishGame);
router.delete('/:id', RpsApiController.destroy);

module.exports = router.routes();
