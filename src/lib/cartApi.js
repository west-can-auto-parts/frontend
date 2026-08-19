import { apiFetch } from "@/lib/apiClient";

const cartRequest = {
  includeAuth: true,
  credentials: "include",
};

function normalizePartToCartPayload(part) {
  return {
    productId: String(
      part.id ?? part.productId ?? part.productCategoryId ?? part.partNumber ?? "",
    ),
    quantity: 1,
    name: part.name,
    partNumber: part.partNumber,
    price: Number(part.price) || 0,
    imageUrl: part.imageUrl || "",
  };
}

/** POST /api/cart/items */
export function addItemToCart(part) {
  return apiFetch("/cart/items", {
    method: "POST",
    body: normalizePartToCartPayload(part),
    ...cartRequest,
  });
}

/** GET /api/cart */
export function fetchCart() {
  return apiFetch("/cart", {
    method: "GET",
    ...cartRequest,
  });
}

/** PATCH /api/cart/items */
export function updateCartItem(productId, quantity) {
  return apiFetch("/cart/items", {
    method: "PATCH",
    body: {
      productId: String(productId),
      quantity,
    },
    ...cartRequest,
  });
}

/** DELETE /api/cart/items/{productId} */
export function removeCartItem(productId) {
  return apiFetch(`/cart/items/${encodeURIComponent(String(productId))}`, {
    method: "DELETE",
    ...cartRequest,
  });
}

/** DELETE /api/cart */
export async function clearCart() {
  await apiFetch("/cart", {
    method: "DELETE",
    ...cartRequest,
  });
  return fetchCart();
}

/** POST /api/cart/coupon */
export function applyCartCoupon(couponCode) {
  return apiFetch("/cart/coupon", {
    method: "POST",
    body: { couponCode: String(couponCode).trim() },
    ...cartRequest,
  });
}

/** DELETE /api/cart/coupon */
export function removeCartCoupon() {
  return apiFetch("/cart/coupon", {
    method: "DELETE",
    ...cartRequest,
  });
}

/** Map API cart line items to UI shape. */
export function normalizeCartItems(cart) {
  const list = cart?.items;
  if (!Array.isArray(list)) return [];

  return list.map((raw) => ({
    productId: String(raw.productId ?? raw.id ?? ""),
    name: raw.name ?? raw.productName ?? String(raw.productId ?? "Product"),
    description: raw.description ?? raw.name ?? raw.productName ?? "",
    manufacturer: raw.manufacturer ?? raw.brand ?? "",
    partNumber: raw.partNumber ?? "",
    price: Number(raw.price) || 0,
    subtotal: Number(raw.subtotal) || 0,
    imageUrl: raw.imageUrl ?? raw.image ?? "",
    quantity: Math.max(1, Number(raw.quantity) || 1),
    location: raw.location ?? null,
  }));
}

/** Map CartResponse totals for order summary. */
export function normalizeCartSummary(cart, items = []) {
  const subtotalFromItems = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const subtotal =
    Number(cart?.subtotal ?? cart?.subTotal ?? subtotalFromItems) || 0;
  const shipping = Number(cart?.shipping ?? cart?.shippingCost ?? 0) || 0;
  const tax =
    Number(cart?.tax ?? cart?.taxes ?? cart?.estimatedTax ?? cart?.gst ?? 0) ||
    0;
  const discount =
    Number(
      cart?.discount ??
        cart?.couponDiscount ??
        cart?.discountAmount ??
        0,
    ) || 0;

  let total = Number(cart?.total ?? cart?.grandTotal ?? 0) || 0;
  if (total <= 0 && subtotal > 0) {
    total = subtotal + shipping + tax - discount;
  }

  const couponCode =
    cart?.couponCode ?? cart?.appliedCoupon ?? cart?.coupon ?? null;

  return {
    itemCount: cart?.itemCount ?? items.length,
    subtotal,
    shipping,
    tax,
    discount,
    total,
    couponCode: couponCode ? String(couponCode) : null,
  };
}
