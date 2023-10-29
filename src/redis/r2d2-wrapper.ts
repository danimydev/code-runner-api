import { retry } from "retry";
import { sendCommand } from "r2d2";

const redisConnection = await retry(
  async () => await Deno.connect({ hostname: "redis", port: 6379 }),
  {
    maxAttempts: 3,
  },
);

console.log("redis connection established");

async function get(key: string) {
  return await sendCommand(redisConnection, ["GET", key]);
}

async function set(key: string, value: string) {
  await sendCommand(redisConnection, ["SET", key, value]);
}

async function setTTL(key: string, seconds: number) {
  await sendCommand(redisConnection, ["EXPIRE", key, seconds]);
}

export const r2d2Wrapper = {
  get,
  set,
  setTTL,
};
