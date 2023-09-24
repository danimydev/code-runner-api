import { Router } from 'oak';

export const healthRouter = new Router({ prefix: '/health' })
  .get('/', (ctx) => {
    ctx.response.status = 200;
    return ctx.response.body = 'OK';
  });
