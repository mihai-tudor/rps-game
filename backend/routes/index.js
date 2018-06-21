import RpsGameModel from './rps-game';

export default (router) => {
  router.prefix('/v1');
  router.use('/rps-games', RpsGameModel);
};
