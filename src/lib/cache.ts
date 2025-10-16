import "server-only";
import { Redis } from "@upstash/redis";

// Simple Upstash Redis client initialized from environment variables.
// Ensure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set.
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function getCached<T>(
  key: string,
  ttlSeconds: number,
  fetcher: () => Promise<T>
): Promise<T> {
  const hit = await redis.get<T>(key);
  if (hit) return hit as T;
  const data = await fetcher();
  // Store JSON-serializable payload with TTL
  await redis.set(key, data, { ex: ttlSeconds });
  return data;
}

export function makeKey(pathname: string, searchParams: URLSearchParams) {
  const sorted = new URLSearchParams([...searchParams].sort());
  const query = sorted.toString();
  return `api:${pathname}${query ? `?${query}` : ""}`;
}

export async function tagKey(key: string, tags: string[]) {
  await Promise.all(tags.map((t) => redis.sadd(`tag:${t}`, key)));
}

export async function invalidateTags(tags: string[]) {
  const keysPerTag = await Promise.all(
    tags.map((t) => redis.smembers<string>(`tag:${t}`))
  );
  const keys = keysPerTag.flat().filter(Boolean);
  if (keys.length) {
    await redis.del(...keys);
  }
}

export function upstreamBase(): string {
  // Prefer explicit env override; default to localhost:8080 in dev; fallback to production URL
  if (process.env.NEXT_PUBLIC_CLIENT_BACKEND_BASE) return process.env.NEXT_PUBLIC_CLIENT_BACKEND_BASE;
  if (process.env.NODE_ENV !== "production") return "http://localhost:8080";
  return "https://clientsidebackend.onrender.com";
}

export function toUpstreamUrl(reqUrl: string) {
  const url = new URL(reqUrl);
  const base = upstreamBase();
  // Keep the /api prefix to match upstream routes (e.g., /api/product/...)
  return `${base}${url.pathname}${url.search}`;
}


