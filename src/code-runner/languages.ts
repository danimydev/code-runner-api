type LanguageInfo = {
	enviromentCommand: string;
	executionCommand: string;
	executionArgs: string[];
	extension: string;
};

export const LANGUAGUES_INFO_MAP = new Map<string, LanguageInfo>([
	['typescript', {
		enviromentCommand: '--version',
		executionCommand: 'deno',
		executionArgs: ['run'],
		extension: 'ts',
	}],
	['python3', {
		enviromentCommand: '--version',
		executionCommand: 'python3',
		executionArgs: [],
		extension: 'py',
	}],
]);

export const LANGUAGUES = [...LANGUAGUES_INFO_MAP.keys()];
