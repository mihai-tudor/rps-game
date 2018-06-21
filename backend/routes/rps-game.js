import Router from 'koa-router';
import * as RpsGameController from '../controllers/rps-game';

const router = new Router();

router.get('/', RpsGameController.findAll);
router.post('/', RpsGameController.create);
router.post('/:id', RpsGameController.update);
router.delete('/:id', RpsGameController.destroy);

module.exports = router.routes();
