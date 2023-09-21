import { Router } from 'oak';
import { runCode } from '../code-runner/run-code.ts';

export const codeRouter = new Router({ prefix: '/code' })
	.post('/', async (ctx) => {
		if (!ctx.request.hasBody) {
			ctx.throw(415);
		}
		const reqBody = await ctx.request.body({ type: 'json' }).value as {
			language: string;
			code: string;
		};

		if (!reqBody.language) {
			ctx.throw(400);
		}

		if (!reqBody.code) {
			ctx.throw(400);
		}

		const { code, decoded } = await runCode({
			language: reqBody.language,
			codeText: reqBody.code,
		});

		return ctx.response.body = {
			languague: reqBody.language,
			...{ code, ...decoded },
			timeStampt: Date.now(),
		};
	});
