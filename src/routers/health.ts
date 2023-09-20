import { Router } from 'oak';

export const healthRouter = new Router({ prefix: '/health' })
	.get('/', (ctx) => {
		return ctx.response.body = 'OK';
	});
