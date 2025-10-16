import { NextResponse } from "next/server";
import { getCached, makeKey, tagKey, toUpstreamUrl } from "@/lib/cache";

const TTL_SEARCH = 300;
const TTL_STATIC = 900;

function ttlFor(pathname: string) {
  if (pathname.endsWith("/search") || pathname.includes("/subcategory/search")) return TTL_SEARCH;
  if (pathname.endsWith("/all") || pathname.endsWith("/name")) return TTL_STATIC;
  return TTL_SEARCH;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = makeKey(url.pathname, url.searchParams);
  const data = await getCached(key, ttlFor(url.pathname), async () => {
    const upstream = toUpstreamUrl(req.url);
    const res = await fetch(upstream, { cache: "no-store" });
    if (!res.ok) throw new Error(`Upstream error: ${res.status}`);
    return res.json();
  });
  await tagKey(key, ["suppliers"]);
  return NextResponse.json(data);
}