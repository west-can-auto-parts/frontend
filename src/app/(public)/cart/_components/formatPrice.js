export function formatAmount(n) {
  return Number(n || 0).toLocaleString("en-CA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** @deprecated Use PriceDisplay for aligned rendering */
export function formatCAD(n) {
  return `CAD$${formatAmount(n)}`;
}
