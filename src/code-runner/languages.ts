export const LANGUAGUES_INFO_MAP = new Map([
	['typescript', {
		enviromentInfo: '--version',
		executeCommand: 'deno',
		executionArgs: ['run'],
		fileExtention: 'ts',
	}],
	['python3', {
		enviromentInfo: '--version',
		executeCommand: 'python3',
		executionArgs: [],
		fileExtention: 'py',
	}],
]);

export const LANGUAGUES = [...LANGUAGUES_INFO_MAP.keys()];
