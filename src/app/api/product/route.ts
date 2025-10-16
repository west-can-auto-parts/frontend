import { NextResponse } from "next/server";
import { getCached, makeKey, tagKey, toUpstreamUrl } from "@/lib/cache";

const TTL = 300; // seconds

export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = makeKey(url.pathname, url.searchParams);
  const data = await getCached(key, TTL, async () => {
    const upstream = toUpstreamUrl(req.url);
    const res = await fetch(upstream, { cache: "no-store" });
    if (!res.ok) throw new Error(`Upstream error: ${res.status}`);
    return res.json();
  });
  await tagKey(key, ["products", "products:all"]);
  return NextResponse.json(data);
}


