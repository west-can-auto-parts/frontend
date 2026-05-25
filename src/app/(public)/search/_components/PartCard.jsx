"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { setPendingProductCategoryFetchId } from "@/lib/productCategoryPendingFetch";

function stringToSlug(str) {
  if (!str || typeof str !== "string") return "";
  let s = str.replace("&", "and");
  s = s.replace(/,/g, "~");
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -~]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

function categoryNameToListingPath(categoryName, listingName) {
  if (!listingName?.trim()) return null;
  const category =
    categoryName === "Replacement Parts" || categoryName === "Fluids & Lubricants"
      ? "replacement-parts"
      : "shop-supplies";
  const slug = stringToSlug(listingName);
  if (!slug) return null;
  return `/${category}/${slug}`;
}

/** Prefer category id for API; search payloads may use any of these. */
function productCategoryIdForQuery(part) {
  const raw =
    part.productCategoryId ??
    part.productCategory?.id ??
    part.productId ??
    part.id;
  if (raw == null || raw === "") return null;
  return String(raw);
}

function resolvePartHref(part) {
  const listing = part.name ?? part.listing ?? "";
  const categoryName =
    part.categoryName ?? part.category ?? part.parentCategoryName ?? "";
  const gridPath = categoryNameToListingPath(categoryName, listing);
  if (gridPath) return gridPath;
  if (part.canonicalUrl) {
    try {
      const u = new URL(part.canonicalUrl, "http://placeholder.local");
      return `${u.pathname}${u.search}${u.hash || ""}`;
    } catch {
      return part.canonicalUrl;
    }
  }
  return "#";
}

function persistPendingCategoryIdForHref(part, href) {
  const pid = productCategoryIdForQuery(part);
  if (!pid || !href || href === "#") return;
  try {
    const pathOnly =
      href.startsWith("http://") || href.startsWith("https://")
        ? new URL(href).pathname
        : href.split("?")[0].split("#")[0];
    const slug = pathOnly.split("/").filter(Boolean).pop();
    if (slug) setPendingProductCategoryFetchId(slug, pid);
  } catch {
    /* ignore */
  }
}

export function PartCard({ part }) {
  const [imgError, setImgError] = useState(false);

  const {
    name,
    partNumber,
    description,
    imageUrl,
    manufacturer,
    manufacturerImageUrl,
    category,
    price,
    outOfStock,
    fitmentNote,
    productTags = [],
  } = part;

  const href = useMemo(
    () => resolvePartHref(part),
    [
      part.name,
      part.listing,
      part.categoryName,
      part.category,
      part.parentCategoryName,
      part.canonicalUrl,
      part.productCategoryId,
      part.productId,
      part.id,
      part.productCategory,
    ],
  );
  const isNavigable = !outOfStock && href !== "#";

  const CardShell = isNavigable ? Link : "div";
  const shellProps = isNavigable
    ? {
        href,
        className: "block h-full",
        onClick: () => persistPendingCategoryIdForHref(part, href),
      }
    : { className: "h-full" };

  return (
    <CardShell {...shellProps}>
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md
                    transition-shadow duration-200 flex flex-col overflow-hidden group h-full">

      {/* ── Image ──────────────────────────────────────────────────── */}
      <div className="relative bg-gray-50 aspect-square overflow-hidden flex items-center justify-center">
        {!imgError && imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain p-4 group-hover:scale-105
                       transition-transform duration-300"
          />
        ) : (
          // ── Fallback: show part name when image fails or is missing ──
          <div className="w-full h-full flex flex-col items-center justify-center
                          gap-2 px-4 text-center bg-gray-100">
            <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586
                   a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6
                   a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-semibold text-gray-500 line-clamp-3 leading-snug">
              {name}
            </span>
          </div>
        )}

        {/* Out of stock badge */}
        {outOfStock && (
          <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs
                          font-semibold px-2 py-1 rounded-md">
            Out of Stock
          </div>
        )}

        {/* Category badge (search may use category; grid uses categoryName for routing) */}
        {(category || part.categoryName) && (
          <div className="absolute top-2 right-2 bg-white border border-gray-200
                          text-gray-600 text-xs font-medium px-2 py-1 rounded-md shadow-sm">
            {category || part.categoryName}
          </div>
        )}
      </div>

      {/* ── Body ───────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-4 gap-3">

        {/* Manufacturer */}
        <div className="flex items-center gap-2">
          {manufacturerImageUrl ? (
            <img
              src={manufacturerImageUrl}
              alt={manufacturer}
              className="h-5 object-contain"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          ) : (
            <span className="text-xs font-bold text-[#b91c1c] tracking-wide uppercase">
              {manufacturer}
            </span>
          )}
        </div>

        {/* Part name + number */}
        <div>
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2
                         group-hover:text-[#b91c1c] transition-colors">
            {name}
          </h3>
          <p className="text-xs text-gray-400 mt-1 font-mono">#{partNumber}</p>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed flex-1">
          {description}
        </p>

        {/* Fitment note */}
        {fitmentNote && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            <p className="text-xs text-amber-700 leading-tight">{fitmentNote}</p>
          </div>
        )}

        {/* Tags */}
        {productTags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {productTags.slice(0, 3).map((tag) => (
              <span key={tag}
                className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div>
            <span className="text-xl font-bold text-gray-900">
              ${price?.toFixed(2)}
            </span>
            <span className="text-xs text-gray-400 ml-1">CAD</span>
          </div>

          {isNavigable ? (
            <span
              className="inline-flex px-4 py-2 rounded-lg text-xs font-semibold transition-colors
                bg-[#b91c1c] text-white group-hover:bg-red-800"
            >
              View Part
            </span>
          ) : (
            <span
              className="inline-flex px-4 py-2 rounded-lg text-xs font-semibold
                bg-gray-100 text-gray-400 cursor-not-allowed"
            >
              Unavailable
            </span>
          )}
        </div>
      </div>
    </div>
    </CardShell>
  );
}