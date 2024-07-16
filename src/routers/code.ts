import { Router } from "oak";
import * as valibot from "valibot";

import { runCode } from "@/code-runner/run-code.ts";
import { LANGUAGUES_NAMES } from "@/code-runner/languages.ts";

const PostCodeBodySchema = valibot.object({
  language: valibot.pipe(valibot.string(), valibot.minLength(1)),
  code: valibot.pipe(valibot.string(), valibot.minLength(1)),
});

export const codeRouter = new Router({ prefix: "/code" })
  .post("/", async (ctx) => {
    try {
      if (!ctx.request.hasBody) {
        ctx.throw(415, "json body is required");
      }

      const reqBody = await ctx.request.body({ type: "json" }).value as {
        language: string;
        code: string;
      };

      const body = valibot.parse(PostCodeBodySchema, reqBody);

      if (!body.language || body.language.trim().length === 0) {
        ctx.throw(400, "language is required");
      }

      if (!body.code || body.code.trim().length === 0) {
        ctx.throw(400, "code is required.");
      }

      if (!LANGUAGUES_NAMES.includes(body.language)) {
        ctx.throw(400, "language not supported");
      }

      const { code, elapsed, decoded: { stderr, stdout } } = await runCode({
        language: body.language,
        codeText: body.code,
      });

      ctx.response.status = 201;
      return ctx.response.body = {
        languague: body.language,
        code,
        stdout,
        stderr,
        elapsed,
        timeStampt: Date.now(),
      };
    } catch (error) {
      ctx.response.status = 500;
      return ctx.response.body = {
        error: (error as Error).message,
      };
    }
  });
