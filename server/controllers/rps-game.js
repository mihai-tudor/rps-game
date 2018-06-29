import { createReadStream } from 'fs';

export const gamePage = (ctx) => {
  ctx.type = 'html';
  ctx.body = createReadStream('./build/index.html');
};

export const error404 = (ctx) => {
  // ctx.status = 404;
  if (ctx.status !== 404) return;
  ctx.body = 'Sorry, 404';
};
