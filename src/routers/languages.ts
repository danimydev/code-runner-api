import { Router } from 'oak';
import { LANGUAGUES, LANGUAGUES_INFO_MAP } from '../code-runner/languages.ts';

export const languagesRouter = new Router({ prefix: '/languages' })
	.get('/', async (ctx) => {
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

		ctx.response.status = 200;
		return ctx.response.body = {
			languages: formattedLanguages,
			timeStampt: Date.now(),
		};
	});
