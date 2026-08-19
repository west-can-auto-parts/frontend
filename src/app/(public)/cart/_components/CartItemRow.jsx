"use client";

import { PriceDisplay } from "./PriceDisplay";
import { FaTrashAlt } from "react-icons/fa";

export function CartItemRow({
  item,
  selected,
  onToggle,
  onDelete,
  onQtyChange,
  busy,
}) {
  const lineTotal = item.price * item.quantity;

  return (
    <li className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-4 px-5 py-5 sm:grid-cols-[auto_8rem_1fr_8rem] sm:items-start">
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onToggle(item.productId)}
        disabled={busy}
        className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-[#b91c1c] focus:ring-[#b91c1c] disabled:opacity-50 sm:row-span-2"
      />

      <div className="h-28 w-full shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 sm:col-start-2 sm:row-span-2 sm:h-32 sm:w-32">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.description}
            className="h-full w-full object-contain p-2"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
            No image
          </div>
        )}
      </div>

      <div className="col-start-2 min-w-0 sm:col-start-3">
        <h2 className="line-clamp-2 text-[15px] font-medium leading-snug text-slate-800">
          {item.description}
        </h2>
        {(item.manufacturer || item.partNumber) && (
          <div className="mt-2 space-y-1 text-xs text-slate-500">
            {item.manufacturer && (
              <p>
                <span className="font-semibold text-slate-600">Brand:</span>{" "}
                {item.manufacturer}
              </p>
            )}
            {item.partNumber && (
              <p>
                <span className="font-semibold text-slate-600">Part number:</span>{" "}
                <span className="font-mono">{item.partNumber}</span>
              </p>
            )}
          </div>
        )}
        <p className="mt-2 text-sm font-semibold text-emerald-600">In stock</p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center overflow-hidden rounded-full border border-slate-300">
            <button
              type="button"
              onClick={() => onQtyChange(item.productId, -1)}
              disabled={busy || item.quantity <= 1}
              className="flex h-8 w-8 items-center justify-center text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
            <button
              type="button"
              onClick={() => onQtyChange(item.productId, 1)}
              disabled={busy}
              className="flex h-8 w-8 items-center justify-center text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => onDelete(item.productId)}
            disabled={busy}
            aria-label="Delete item"
            title="Delete item"
            className="flex h-8 w-8 items-center justify-center rounded-full text-rose-600 transition hover:bg-rose-50 hover:text-rose-700 disabled:opacity-50"
          >
            <FaTrashAlt size={18} />
          </button>
        </div>
      </div>

      <div className="col-start-2 flex flex-col gap-3 text-left sm:col-start-4 sm:row-start-1 sm:items-end sm:text-right">
        <PriceDisplay amount={lineTotal} size="lg" />

        {item.price > 0 && (
          <p className="inline-flex items-baseline gap-1 text-xs text-slate-500">
            <span>Unit price:</span>
            <PriceDisplay amount={item.price} size="sm" muted />
          </p>
        )}

        {item.quantity > 1 && item.price > 0 && (
          <p className="flex items-center gap-1 text-xs text-slate-500">
            <span className="tabular-nums">{item.quantity} ×</span>
            <PriceDisplay amount={item.price} size="sm" muted />
          </p>
        )}
      </div>
    </li>
  );
}
