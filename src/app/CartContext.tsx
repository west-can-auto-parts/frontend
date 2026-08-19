"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { fetchCart } from "@/lib/cartApi";

export const WC_CART_UPDATED_EVENT = "wc-cart-updated";

export type CartUpdatedDetail = {
  itemCount?: number;
};

interface CartContextType {
  itemCount: number;
  refreshCart: () => Promise<void>;
  setItemCount: (count: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function notifyCartUpdated(detail?: CartUpdatedDetail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<CartUpdatedDetail>(WC_CART_UPDATED_EVENT, { detail }),
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [itemCount, setItemCount] = useState(0);

  const refreshCart = useCallback(async () => {
    try {
      const data = await fetchCart();
      setItemCount(typeof data?.itemCount === "number" ? data.itemCount : 0);
    } catch {
      setItemCount(0);
    }
  }, []);

  useEffect(() => {
    refreshCart();

    const onCartUpdated = (event: Event) => {
      const detail = (event as CustomEvent<CartUpdatedDetail>).detail;
      if (typeof detail?.itemCount === "number") {
        setItemCount(detail.itemCount);
        return;
      }
      refreshCart();
    };

    window.addEventListener(WC_CART_UPDATED_EVENT, onCartUpdated);
    return () => window.removeEventListener(WC_CART_UPDATED_EVENT, onCartUpdated);
  }, [refreshCart]);

  return (
    <CartContext.Provider value={{ itemCount, refreshCart, setItemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
