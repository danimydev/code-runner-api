import { Application } from 'oak';
import { healthRouter } from './routers/health.ts';

const app = new Application()
	.use(healthRouter.routes());

await app.listen({ port: 3000 });
