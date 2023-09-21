import { Router } from 'oak';
import { LANGUAGUES, LANGUAGUES_INFO_MAP } from '../code-runner/languages.ts';

type FormattedLanguage = {
	language: string;
	executeCommand: string;
	enviromentInfo: string;
};

export const languagesRouter = new Router({ prefix: '/languages' })
	.get('/', async (ctx) => {
		const formattedLanguages: FormattedLanguage[] = await Promise.all(
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

				const versionCommand = new Deno.Command(languageInfo.executeCommand, {
					args: [
						languageInfo.enviromentInfo,
					],
				});

				const { stdout } = await versionCommand.output();

				return {
					language,
					executeCommand: languageInfo.executeCommand,
					enviromentInfo: new TextDecoder().decode(stdout),
				};
			}),
		);

		ctx.response.status = 200;
		return ctx.response.body = {
			languages: formattedLanguages,
			timeStampt: Date.now(),
		};
	});
