import Router from 'koa-router';
import * as RpsApiController from '../controllers/rps-api';

const router = new Router();

router.get('/', RpsApiController.findAll);
router.post('/', RpsApiController.create);
router.post('/:id', RpsApiController.update);
router.delete('/:id', RpsApiController.destroy);

module.exports = router.routes();
