import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "https://us1-eager-sole-40017.upstash.io",
  token: process.env.NEXT_PUBLIC_UPSTASH_TOKEN,
});

export const getNap = async (key) => {
  return await redis.get(key);
};

export const setNap = async (key, val) => {
  const returnVal = await redis.get(key);
  if (returnVal === null) {
    await redis.set(key, JSON.stringify(val));
  }
};
