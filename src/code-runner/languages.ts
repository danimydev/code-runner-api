export const LANGUAGUES_INFO_MAP = new Map([
	['typescript', {
		enviromentInfo: '--version',
		executeCommand: 'deno',
		fileExtention: 'ts',
	}],
	['python3', {
		enviromentInfo: '--version',
		executeCommand: 'python3',
		fileExtention: 'py',
	}],
]);

export const LANGUAGUES = [...LANGUAGUES_INFO_MAP.keys()];
