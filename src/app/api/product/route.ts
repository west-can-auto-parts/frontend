import { NextResponse } from "next/server";
import { getCached, makeKey, tagKey, toUpstreamUrl, redis } from "@/lib/cache";

const TTL = 300; // seconds
export const runtime = "nodejs";
export const maxDuration = 60; // allow slower upstream in production

export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = makeKey(url.pathname, url.searchParams);
  const cached = await redis.get(key);

  const fetchWithTimeout = async () => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      const upstream = toUpstreamUrl(req.url);
      const res = await fetch(upstream, { cache: "no-store", signal: controller.signal });
      if (!res.ok) throw new Error(`Upstream error: ${res.status}`);
      return await res.json();
    } finally {
      clearTimeout(timer);
    }
  };

  let data;
  try {
    data = await getCached(key, TTL, fetchWithTimeout);
  } catch (e) {
    if (cached) {
      return NextResponse.json(cached as unknown as any, { headers: { "x-cache-fallback": "stale" } });
    }
    throw e;
  }
  await tagKey(key, ["products", "products:all"]);
  return NextResponse.json(data);
}


