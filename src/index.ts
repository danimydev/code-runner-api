import { Application } from 'oak';
import { healthRouter } from './routers/health.ts';
import { languagesRouter } from './routers/languages.ts';

const app = new Application()
	.use(healthRouter.routes())
	.use(languagesRouter.routes());

await app.listen({ port: 3000 });
