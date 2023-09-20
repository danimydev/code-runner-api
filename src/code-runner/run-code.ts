import { LANGUAGUES } from './languages.ts';

async function runTypeScriptProgram(codeText: string) {
	// Define command used to create the subprocess
	const command = new Deno.Command(Deno.execPath(), {
		args: [
			'eval',
			codeText,
		],
	});

	// Create a promise that resolves after 2 seconds (timeout)
	const timeoutPromise = new Promise<void>((_, reject) => {
		setTimeout(() => {
			reject(new Error('Execution takes too long (timeout).'));
		}, 2000);
	});

	try {
		// Use Promise.race to race between the command output and the timeout
		const result = await Promise.race([
			command.output(),
			timeoutPromise,
		]);

		console.log(result);
		return result;
	} catch (error) {
		throw error;
	}
}

export async function runCode({ language = '', code = '' }) {
	if (!code || code.trim().length === 0) {
		throw new Error('No code found to execute.');
	}

	if (!LANGUAGUES.includes(language)) {
		throw new Error('Language not supported');
	}

	switch (language) {
		case 'typescript':
			return await runTypeScriptProgram(code);
	}
}

const code = `
// Simulate a long-running task
for (let i = 0; i < 100000000; i++) {}
console.log("Done!");
`;
await runCode({ language: 'typescript', code });
