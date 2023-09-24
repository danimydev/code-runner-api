import { Router } from 'oak';
import { LANGUAGUES, LANGUAGUES_INFO_MAP } from '../code-runner/languages.ts';
import { r2d2Wrapper } from '../redis/r2d2-wrapper.ts';

export const languagesRouter = new Router({ prefix: '/languages' })
	.get('/', async (ctx) => {
		const cached = await r2d2Wrapper.get('languages');

		if (cached) {
			const formattedLanguages = JSON.parse(cached.toString());
			ctx.response.status = 200;
			return ctx.response.body = {
				languages: formattedLanguages,
				timeStampt: Date.now(),
			};
		}

		const formattedLanguages = await Promise.all(
			LANGUAGUES.map(async (
				language,
			) => {
				const languageInfo = LANGUAGUES_INFO_MAP.get(
					language,
				);

				if (!languageInfo) {
					return {
						language,
						enviromentInfo: 'not supported',
						executeCommand: 'not supported',
					};
				}

				const getEnviromentCommand = new Deno.Command(
					languageInfo.executionCommand,
					{
						args: [
							languageInfo.enviromentCommand,
						],
					},
				);

				const { stdout } = await getEnviromentCommand.output();

				const enviromentInfo = new TextDecoder().decode(stdout).split('\n');
				enviromentInfo.pop();

				return {
					language,
					enviromentInfo,
				};
			}),
		);

		await r2d2Wrapper.set('languages', JSON.stringify(formattedLanguages));
		await r2d2Wrapper.setTTL('languages', 12 * 60 * 60);

		ctx.response.status = 200;
		return ctx.response.body = {
			languages: formattedLanguages,
			timeStampt: Date.now(),
		};
	})
	.get('/:languageName', async (ctx) => {
		try {
			const { languageName } = ctx.params;

			const cached = await r2d2Wrapper.get(`languages-${languageName}`);

			if (cached) {
				const enviromentInfo = JSON.parse(cached.toString());
				ctx.response.status = 200;
				return ctx.response.body = {
					language: enviromentInfo,
					timeStampt: Date.now(),
				};
			}

			const languageInfo = LANGUAGUES_INFO_MAP.get(languageName);
			if (!languageInfo) {
				ctx.response.status = 404;
				ctx.response.body = {
					code: 'NOT_FOUND',
					error: 'Language not found.',
				};
				return;
			}

			const getEnviromentCommand = new Deno.Command(
				languageInfo.executionCommand,
				{
					args: [
						languageInfo.enviromentCommand,
					],
				},
			);

			const { stdout, code, stderr } = await getEnviromentCommand.output();

			const enviromentInfo = new TextDecoder().decode(stdout).split('\n');
			enviromentInfo.pop();

			if (code !== 0 || stderr.length > 0) {
				ctx.response.status = 500;
				ctx.response.body = {
					code: 'INTERNAL_SERVER_ERROR',
					error: 'An error has ocurred on our side',
				};
				return;
			}

			await r2d2Wrapper.set(
				`languages-${languageName}`,
				JSON.stringify(enviromentInfo),
			);
			await r2d2Wrapper.setTTL(`languages-${languageName}`, 12 * 60 * 60);

			ctx.response.status = 200;
			ctx.response.body = {
				language: languageName,
				enviromentInfo,
			};
			return;
		} catch (error) {
			ctx.response.status = 500;
			ctx.response.body = {
				code: 'INTERNAL_SERVER_ERROR',
				error: (error as Error).message,
			};
			return;
		}
	});
