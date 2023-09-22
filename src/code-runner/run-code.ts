import { LANGUAGUES, LANGUAGUES_INFO_MAP } from './languages.ts';

type RunCodeResult = {
	code: number;
	stdout: Uint8Array;
	stderr: Uint8Array;
	decoded: {
		stdout: string;
		stderr: string;
	};
};

export async function runCode({
	language,
	codeText,
}: {
	language: string;
	codeText: string;
}): Promise<RunCodeResult> {
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

	const fileName = `${crypto.randomUUID()}.${languageInfo.extension}`;

	await Deno.writeTextFile(fileName, codeText);

	const command = new Deno.Command(languageInfo.executionCommand, {
		args: languageInfo.executionArgs.concat(fileName),
		stdout: 'piped',
		stdin: 'piped',
		stderr: 'piped',
	});

	const codeProccess = command.spawn();

	const timeoutPromise = new Promise<Deno.CommandOutput>(
		(_resolve, reject) => {
			setTimeout(() => {
				try {
					codeProccess.kill();
				} catch (error) {
					console.log(error);
				} finally {
					reject(new Error('Execution is taking too long.'));
				}
			}, 3000);
		},
	);

	const { code, stdout, stderr } = await Promise.race([
		codeProccess.output(),
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
