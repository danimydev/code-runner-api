import { LANGUAGUES, LANGUAGUES_INFO_MAP } from './languages.ts';

export async function runCode({ language = '', codeText = '' }) {
	if (!codeText || codeText.trim().length === 0) {
		throw new Error('No code found to execute.');
	}

	if (!LANGUAGUES.includes(language)) {
		throw new Error('Language not supported');
	}

	const languageInfo = LANGUAGUES_INFO_MAP.get(language);

	if (!languageInfo) {
		throw new Error('Language information not found.');
	}

	const fileName = `${crypto.randomUUID()}.${languageInfo.fileExtention}`;

	await Deno.writeTextFile(fileName, codeText);

	const args = language === 'typescript' ? ['run', fileName] : [fileName];

	const command = new Deno.Command(languageInfo.executeCommand, {
		args,
		stdout: 'piped',
		stdin: 'piped',
		stderr: 'piped',
	});

	const proccess = command.spawn();

	// Promise that rejects after a timeout
	const timeoutPromise = new Promise<Deno.CommandOutput>(
		(_resolve, reject) => {
			setTimeout(() => {
				proccess.kill();
				reject(new Error('Execution is taking too long.'));
			}, 1000);
		},
	);

	const { code, stdout, stderr } = await Promise.race([
		proccess.output(),
		timeoutPromise,
	]);

	await Deno.remove(fileName);

	const td = new TextDecoder();

	return {
		code,
		stdout,
		stderr,
		decoded: {
			stdout: td.decode(stdout),
			stderr: td.decode(stderr),
		},
	};
}
