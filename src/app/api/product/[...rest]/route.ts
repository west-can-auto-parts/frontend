import { NextResponse } from "next/server";
import { getCached, makeKey, tagKey, toUpstreamUrl } from "@/lib/cache";

// TTLs can vary; default to 600s for specific product sub-routes
const DEFAULT_TTL = 600;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = makeKey(url.pathname, url.searchParams);
  const data = await getCached(key, DEFAULT_TTL, async () => {
    const upstream = toUpstreamUrl(req.url);
    const res = await fetch(upstream, { cache: "no-store" });
    if (!res.ok) throw new Error(`Upstream error: ${res.status}`);
    return res.json();
  });
  // Tag by broad product scope; more granular tags can be added based on path
  await tagKey(key, ["products"]);
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  // Pass-through for POSTs (e.g., /product/productenquiry) without caching
  const upstream = toUpstreamUrl(req.url);
  const res = await fetch(upstream, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: await req.text(),
  });
  const body = await res.text();
  return new NextResponse(body, { status: res.status, headers: res.headers });
}


