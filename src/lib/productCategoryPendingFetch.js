const STORAGE_KEY_PREFIX = "wc:productCategoryFetch:";

export function setPendingProductCategoryFetchId(slug, id) {
  if (typeof window === "undefined" || !slug || id == null || id === "") return;
  sessionStorage.setItem(STORAGE_KEY_PREFIX + slug, String(id));
}

/** Read and remove so refresh / direct URL uses slug only. */
export function consumePendingProductCategoryFetchId(slug) {
  if (typeof window === "undefined" || !slug) return null;
  const key = STORAGE_KEY_PREFIX + slug;
  const value = sessionStorage.getItem(key);
  if (value != null && value !== "") {
    sessionStorage.removeItem(key);
    return value;
  }
  return null;
}
