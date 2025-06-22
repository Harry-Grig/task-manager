import { Redis } from "@upstash/redis";
export const redis = new Redis({
  url: "https://arriving-cardinal-16186.upstash.io",
  token: "AT86AAIjcDE5MzQ5NzFhNTA0YjU0Mzc4YWE1MjcwNjQ2MTEyZWUwNnAxMA",
});

await redis.set("foo", "bar");
await redis.get("foo");
