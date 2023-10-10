import { Router } from 'oak';

import { runCode } from '@/code-runner/run-code.ts';
import { LANGUAGUES_NAMES } from '@/code-runner/languages.ts';

export const codeRouter = new Router({ prefix: '/code' })
  .post('/', async (ctx) => {
    try {
      if (!ctx.request.hasBody) {
        ctx.throw(415, 'json body is required');
      }

      const reqBody = await ctx.request.body({ type: 'json' }).value as {
        language: string;
        code: string;
      };

      if (!reqBody.language || reqBody.language.trim().length === 0) {
        ctx.throw(400, 'language is required');
      }

      if (!reqBody.code || reqBody.code.trim().length === 0) {
        ctx.throw(400, 'code is required.');
      }

      if (!LANGUAGUES_NAMES.includes(reqBody.language)) {
        ctx.throw(400, 'language not supported');
      }

      const { code, decoded: { stderr, stdout } } = await runCode({
        language: reqBody.language,
        codeText: reqBody.code,
      });

      ctx.response.status = 201;
      return ctx.response.body = {
        languague: reqBody.language,
        code,
        stdout,
        stderr,
        timeStampt: Date.now(),
      };
    } catch (error) {
      ctx.response.status = 500;
      return ctx.response.body = {
        error: (error as Error).message,
      };
    }
  });
