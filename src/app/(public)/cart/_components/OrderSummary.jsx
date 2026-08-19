"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ApiError } from "@/lib/apiClient";
import { PriceDisplay } from "./PriceDisplay";

function computeSelectedTotals(items, selected, summary) {
  const selectedItems = items.filter((i) => selected[i.productId]);
  const selectedSubtotal = selectedItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0,
  );
  const selectedCount = selectedItems.reduce((n, i) => n + i.quantity, 0);

  if (selectedCount === 0) {
    return {
      selectedCount: 0,
      subtotal: 0,
      shipping: 0,
      tax: 0,
      discount: 0,
      total: 0,
    };
  }

  const fullSubtotal =
    Number(summary?.subtotal) ||
    items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const ratio = fullSubtotal > 0 ? selectedSubtotal / fullSubtotal : 1;

  const fullShipping = Number(summary?.shipping ?? 0) || 0;
  const fullTax = Number(summary?.tax ?? 0) || 0;
  const fullDiscount = Number(summary?.discount ?? 0) || 0;

  const shipping = fullShipping > 0 ? fullShipping * ratio : 0;
  const tax =
    fullTax > 0
      ? Math.round(fullTax * ratio * 100) / 100
      : Math.round(selectedSubtotal * 0.05 * 100) / 100;
  const discount =
    fullDiscount > 0 ? Math.round(fullDiscount * ratio * 100) / 100 : 0;

  const total = selectedSubtotal + shipping + tax - discount;

  return {
    selectedCount,
    subtotal: selectedSubtotal,
    shipping,
    tax,
    discount,
    total,
  };
}

export function OrderSummary({
  items,
  selected,
  summary,
  onApplyCoupon,
  onRemoveCoupon,
  couponBusy,
}) {
  const [coupon, setCoupon] = useState(summary?.couponCode ?? "");
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    setCoupon(summary?.couponCode ?? "");
  }, [summary?.couponCode]);

  const totals = useMemo(
    () => computeSelectedTotals(items, selected, summary),
    [items, selected, summary],
  );

  const { selectedCount, subtotal, shipping, tax, discount, total } = totals;
  const hasAppliedCoupon = Boolean(summary?.couponCode);

  const handleApplyCoupon = async () => {
    const code = coupon.trim();
    if (!code) {
      setMsg({ type: "error", text: "Please enter a coupon code." });
      return;
    }

    setMsg(null);
    try {
      await onApplyCoupon(code);
      setMsg({ type: "success", text: `Coupon "${code.toUpperCase()}" applied.` });
    } catch (error) {
      const text =
        error instanceof ApiError
          ? error.message
          : "Could not apply coupon. Please try again.";
      setMsg({ type: "error", text });
    }
  };

  const handleRemoveCoupon = async () => {
    setMsg(null);
    try {
      await onRemoveCoupon();
      setCoupon("");
    } catch (error) {
      const text =
        error instanceof ApiError
          ? error.message
          : "Could not remove coupon. Please try again.";
      setMsg({ type: "error", text });
    }
  };

  return (
    <div className="sticky top-24 space-y-4">
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-800">Order Summary</h2>
          <p className="text-xs text-slate-500">
            {selectedCount} item{selectedCount !== 1 ? "s" : ""} selected
          </p>
        </div>

        <div className="space-y-4 px-5 py-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Promo / Coupon Code
            </label>
            <div className="flex gap-2">
              <input
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value);
                  if (msg) setMsg(null);
                }}
                onKeyDown={(e) => e.key === "Enter" && !couponBusy && handleApplyCoupon()}
                placeholder="Enter code"
                disabled={hasAppliedCoupon || couponBusy}
                className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#b91c1c] focus:outline-none focus:ring-2 focus:ring-red-100 disabled:bg-slate-50"
              />
              {hasAppliedCoupon ? (
                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  disabled={couponBusy}
                  className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-50"
                >
                  Remove
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={couponBusy}
                  className="rounded-lg bg-[#b91c1c] px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-50"
                >
                  {couponBusy ? "…" : "Apply"}
                </button>
              )}
            </div>
            {hasAppliedCoupon && (
              <p className="mt-2 text-xs font-medium text-emerald-600">
                Applied {summary.couponCode}
                {discount > 0 && (
                  <>
                    {" — "}
                    <PriceDisplay amount={discount} size="xs" /> off
                  </>
                )}
              </p>
            )}
            {msg && (
              <p
                className={`mt-2 text-xs font-medium ${
                  msg.type === "success" ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {msg.text}
              </p>
            )}
          </div>

          <dl className="space-y-2 border-t border-slate-200 pt-4 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-slate-600">Subtotal</dt>
              <dd>
                <PriceDisplay amount={subtotal} size="sm" />
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-slate-600">Shipping</dt>
              <dd className="whitespace-nowrap font-medium text-slate-800">
                {shipping === 0 ? (
                  <span className="text-emerald-600">FREE</span>
                ) : (
                  <PriceDisplay amount={shipping} size="sm" />
                )}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-slate-600">Estimated tax</dt>
              <dd>
                <PriceDisplay amount={tax} size="sm" />
              </dd>
            </div>
            {discount > 0 && (
              <div className="flex items-center justify-between gap-4">
                <dt className="text-emerald-600">Coupon discount</dt>
                <dd className="inline-flex items-baseline gap-0.5 text-emerald-600">
                  <span>−</span>
                  <PriceDisplay amount={discount} size="sm" className="text-emerald-600" />
                </dd>
              </div>
            )}
          </dl>

          <div className="flex items-center justify-between gap-4 border-t-2 border-slate-800 pt-3">
            <dt className="text-base font-bold text-slate-900">Total</dt>
            <dd>
              <PriceDisplay amount={total} size="xl" />
            </dd>
          </div>

          <button
            type="button"
            disabled={selectedCount === 0}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#b91c1c] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-red-100 transition hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none"
          >
            Proceed to checkout
          </button>

          <p className="text-center text-xs text-slate-500">
            Secure checkout — your data is encrypted.
          </p>
        </div>
      </div>

      <Link
        href="/categories"
        className="block rounded-2xl bg-white p-5 text-center text-sm font-semibold text-[#b91c1c] shadow-sm ring-1 ring-slate-200 hover:bg-red-50"
      >
        Continue shopping
      </Link>
    </div>
  );
}
