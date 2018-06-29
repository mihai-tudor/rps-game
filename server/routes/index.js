import ApiRoutes from './rps-api';
import AppRoutes from './rps-game';

export const apiRoutes = (router) => {
  router.prefix('/v1');
  router.use('/rps-games', ApiRoutes);
};

export const appRoutes = (router) => {
  router.use(AppRoutes);
};
