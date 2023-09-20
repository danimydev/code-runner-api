import { Router } from 'oak';
import { LANGUAGUES, LANGUAGUES_INFO_MAP } from '../code-runner/languages.ts';

type FormattedLanguage = {
	language: string;
	executeCommand: string;
	enviromentInfo: string;
};

export const languagesRouter = new Router({ prefix: '/languages' })
	.get('/', (ctx) => {
		const formattedLanguages: FormattedLanguage[] = LANGUAGUES.map((
			language,
		) => {
			const languageInfo = LANGUAGUES_INFO_MAP.get(
				language,
			);
			return {
				language,
				executeCommand: languageInfo?.executeCommand || 'not supported',
				enviromentInfo: languageInfo?.enviromentInfo || 'not supported',
			};
		});

		return ctx.response.body = formattedLanguages;
	});
