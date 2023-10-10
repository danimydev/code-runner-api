import { Application } from 'oak';

import { healthRouter } from "@/routers/health.ts";
import { languagesRouter } from "@/routers/languages.ts";
import { codeRouter } from "@/routers/code.ts";

const app = new Application()
  .use(healthRouter.routes())
  .use(languagesRouter.routes())
  .use(codeRouter.routes());

console.log(`server listening at 3000`);
await app.listen({ port: 3000 });
