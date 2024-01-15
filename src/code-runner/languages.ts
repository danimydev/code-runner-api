type LanguageInfo = {
  enviromentCommand: string;
  executionCommand: string;
  executionArgs: string[];
  extension: string;
  websiteUrl: string;
};

export const LANGUAGUES_INFO_MAP = new Map<string, LanguageInfo>([
  ["typescript", {
    enviromentCommand: "--version",
    executionCommand: "deno",
    executionArgs: ["run"],
    extension: "ts",
    websiteUrl: "https://www.typescriptlang.org/",
  }],
  ["python", {
    enviromentCommand: "--version",
    executionCommand: "python3",
    executionArgs: [],
    extension: "py",
    websiteUrl: "https://www.python.org/",
  }],
  ["javascript", {
    enviromentCommand: "--version",
    executionCommand: "deno",
    executionArgs: ["run"],
    extension: "js",
    websiteUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  }],
  ["golang", {
    enviromentCommand: "version",
    executionCommand: "go",
    executionArgs: ["run"],
    extension: "go",
    websiteUrl: "https://golang.org/",
  }],
]);

export const LANGUAGUES_NAMES = [...LANGUAGUES_INFO_MAP.keys()];
