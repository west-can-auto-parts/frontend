"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CartItemsPanel } from "./_components/CartItemsPanel";
import { OrderSummary } from "./_components/OrderSummary";
import {
  applyCartCoupon,
  clearCart,
  fetchCart,
  normalizeCartItems,
  normalizeCartSummary,
  removeCartCoupon,
  removeCartItem,
  updateCartItem,
} from "@/lib/cartApi";
import { notifyCartUpdated } from "@/app/CartContext";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [summary, setSummary] = useState(null);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busyProductId, setBusyProductId] = useState(null);
  const [couponBusy, setCouponBusy] = useState(false);
  const [clearBusy, setClearBusy] = useState(false);

  const applyCartResponse = useCallback((cart) => {
    const normalized = normalizeCartItems(cart);
    setItems(normalized);
    setSummary(normalizeCartSummary(cart, normalized));
    setSelected((prev) => {
      const next = {};
      normalized.forEach((item) => {
        next[item.productId] = prev[item.productId] ?? true;
      });
      return next;
    });
    notifyCartUpdated({
      itemCount: cart?.itemCount ?? normalized.length,
    });
  }, []);

  const loadCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const cart = await fetchCart();
      applyCartResponse(cart);
    } catch (err) {
      console.error("Failed to load cart:", err);
      setError("Could not load your cart. Please try again.");
      setItems([]);
      setSummary(null);
    } finally {
      setLoading(false);
    }
  }, [applyCartResponse]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const allSelected = items.length > 0 && items.every((i) => selected[i.productId]);
  const someSelected = items.some((i) => selected[i.productId]);

  const toggleAll = () => {
    const next = {};
    items.forEach((i) => {
      next[i.productId] = !allSelected;
    });
    setSelected(next);
  };

  const toggleOne = (productId) => {
    setSelected((s) => ({ ...s, [productId]: !s[productId] }));
  };

  const onQtyChange = async (productId, delta) => {
    const item = items.find((i) => i.productId === productId);
    if (!item) return;

    const quantity = Math.max(1, item.quantity + delta);
    if (quantity === item.quantity) return;

    setBusyProductId(productId);
    setError(null);
    try {
      const cart = await updateCartItem(productId, quantity);
      applyCartResponse(cart);
    } catch (err) {
      console.error("Failed to update quantity:", err);
      setError("Could not update quantity. Please try again.");
    } finally {
      setBusyProductId(null);
    }
  };

  const onDelete = async (productId) => {
    setBusyProductId(productId);
    setError(null);
    try {
      const cart = await removeCartItem(productId);
      applyCartResponse(cart);
    } catch (err) {
      console.error("Failed to remove item:", err);
      setError("Could not remove this item. Please try again.");
    } finally {
      setBusyProductId(null);
    }
  };

  const onClearCart = async () => {
    if (!items.length || clearBusy) return;
    if (!window.confirm("Remove all items from your cart?")) return;

    setClearBusy(true);
    setError(null);
    try {
      const cart = await clearCart();
      applyCartResponse(cart ?? { items: [], itemCount: 0 });
    } catch (err) {
      console.error("Failed to clear cart:", err);
      setError("Could not clear your cart. Please try again.");
    } finally {
      setClearBusy(false);
    }
  };

  const onApplyCoupon = async (couponCode) => {
    setCouponBusy(true);
    setError(null);
    try {
      const cart = await applyCartCoupon(couponCode);
      applyCartResponse(cart);
    } finally {
      setCouponBusy(false);
    }
  };

  const onRemoveCoupon = async () => {
    setCouponBusy(true);
    setError(null);
    try {
      const cart = await removeCartCoupon();
      applyCartResponse(cart);
    } finally {
      setCouponBusy(false);
    }
  };

  const totalSelectedCount = useMemo(
    () => items.filter((i) => selected[i.productId]).length,
    [items, selected],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900">
        Shopping Cart
      </h1>
      <p className="mb-6 text-slate-500">Review and manage the items in your cart.</p>

      {error && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => {
              setError(null);
              loadCart();
            }}
            className="font-semibold text-[#b91c1c] hover:underline"
          >
            Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <CartItemsPanel
            items={items}
            selected={selected}
            allSelected={allSelected}
            someSelected={someSelected}
            loading={loading}
            onToggleAll={toggleAll}
            onToggleOne={toggleOne}
            onDelete={onDelete}
            onQtyChange={onQtyChange}
            onClearCart={onClearCart}
            clearBusy={clearBusy}
            busyProductId={busyProductId}
          />
        </section>

        <aside className="lg:col-span-1">
          <OrderSummary
            items={items}
            selected={selected}
            summary={summary}
            onApplyCoupon={onApplyCoupon}
            onRemoveCoupon={onRemoveCoupon}
            couponBusy={couponBusy}
          />
        </aside>
      </div>

      {!loading && items.length > 0 && (
        <p className="mt-6 text-center text-xs text-slate-400">
          {totalSelectedCount} of {items.length} line item
          {items.length !== 1 ? "s" : ""} selected for checkout.
        </p>
      )}
    </div>
  );
}
