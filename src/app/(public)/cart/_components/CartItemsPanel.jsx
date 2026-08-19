"use client";

import { useMemo } from "react";
import Link from "next/link";
import { CartItemRow } from "./CartItemRow";

function groupItemsByLocation(items) {
  const groups = new Map();

  for (const item of items) {
    const location = item.location?.trim() || "Other locations";
    if (!groups.has(location)) groups.set(location, []);
    groups.get(location).push(item);
  }

  return Array.from(groups.entries());
}

export function CartItemsPanel({
  items,
  selected,
  allSelected,
  someSelected,
  loading,
  onToggleAll,
  onToggleOne,
  onDelete,
  onQtyChange,
  onClearCart,
  clearBusy,
  busyProductId,
}) {
  const locationGroups = useMemo(() => groupItemsByLocation(items), [items]);

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={allSelected}
            ref={(el) => {
              if (el) el.indeterminate = someSelected && !allSelected;
            }}
            onChange={onToggleAll}
            disabled={loading || items.length === 0}
            className="h-4 w-4 cursor-pointer rounded border-slate-300 text-[#b91c1c] focus:ring-[#b91c1c] disabled:opacity-50"
          />
          Select all items
        </label>
        <div className="flex items-center gap-3">
          {items.length > 0 && (
            <button
              type="button"
              onClick={onClearCart}
              disabled={loading || clearBusy}
              className="text-xs font-semibold text-rose-600 hover:underline disabled:opacity-50"
            >
              {clearBusy ? "Clearing…" : "Clear cart"}
            </button>
          )}
          <span className="w-32 text-right text-sm font-semibold text-slate-500">
            Price
          </span>
        </div>
      </div>

      {loading ? (
        <div className="px-5 py-16 text-center text-sm text-slate-500">Loading your cart…</div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
          <div className="mb-4 text-5xl">🛒</div>
          <p className="text-lg font-medium text-slate-700">Your cart is empty</p>
          <p className="mt-1 text-sm text-slate-500">Add parts from search to get started.</p>
          <Link
            href="/search"
            className="mt-6 inline-flex rounded-lg bg-[#b91c1c] px-4 py-2 text-sm font-semibold text-white hover:bg-red-800"
          >
            Browse parts
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-slate-200">
          {locationGroups.map(([location, locationItems]) => (
            <section key={location}>
              <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-5 py-3">
                <svg
                  className="h-4 w-4 shrink-0 text-[#b91c1c]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <h2 className="text-sm font-semibold text-slate-800">{location}</h2>
                <span className="text-xs text-slate-500">
                  ({locationItems.length} item{locationItems.length !== 1 ? "s" : ""})
                </span>
              </div>
              <ul className="divide-y divide-slate-100">
                {locationItems.map((item) => (
                  <CartItemRow
                    key={item.productId}
                    item={item}
                    selected={!!selected[item.productId]}
                    onToggle={onToggleOne}
                    onDelete={onDelete}
                    onQtyChange={onQtyChange}
                    busy={busyProductId === item.productId}
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
