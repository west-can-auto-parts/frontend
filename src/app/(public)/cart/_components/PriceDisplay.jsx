import { formatAmount } from "./formatPrice";

const SIZE_STYLES = {
  xs: { prefix: "text-[11px] font-medium", amount: "text-xs font-medium" },
  sm: { prefix: "text-xs font-medium", amount: "text-xs font-medium" },
  md: { prefix: "text-sm font-semibold", amount: "text-base font-bold" },
  lg: { prefix: "text-sm font-semibold", amount: "text-lg font-bold" },
  xl: { prefix: "text-base font-semibold", amount: "text-xl font-extrabold" },
};

export function PriceDisplay({
  amount,
  size = "md",
  muted = false,
  className = "",
}) {
  const styles = SIZE_STYLES[size] ?? SIZE_STYLES.md;
  const color = muted ? "text-slate-500" : "text-slate-900";

  return (
    <span
      className={`inline-flex items-baseline whitespace-nowrap font-sans ${color} ${className}`}
    >
      <span className={`${styles.prefix} shrink-0 text-inherit`}>CAD$</span>
      <span className={`${styles.amount} tabular-nums tracking-tight text-inherit`}>
        {formatAmount(amount)}
      </span>
    </span>
  );
}
