import Koa from 'koa';
import Router from 'koa-router';
import Logger from 'koa-logger';
import Cors from '@koa/cors';
import BodyParser from 'koa-bodyparser';
import Helmet from 'koa-helmet';
import respond from 'koa-respond';
import mongoose from 'mongoose';
import rpsRoutes from '../routes';
import koaStatic from 'koa-static';

const app = new Koa();
const router = new Router();

app.use(Helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(Logger())
}

app.use(Cors());
app.use(BodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror: function (err, ctx) {
    if (err) {
      console.log(err.stack);
    }
    ctx.throw('body parse error', 422)
  }
}));

app.use(respond());

// API routes
rpsRoutes(router);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(koaStatic('./build'));

mongoose.connect(process.env.MONGODB_URI);

export default app;
