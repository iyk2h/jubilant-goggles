import { kv } from "@vercel/kv";

const getNap = async (key) => {
  return await kv.get(key);
};

const setNap = async (key, val) => {
  const returnVal = await kv.get(key);
  if (returnVal === null) {
    await kv.set(key, JSON.stringify(val));
  }
};

module.exports = {
  getNap,
  setNap,
};
