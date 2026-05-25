"use client";

import { FaCar, FaTrash, FaXmark } from "react-icons/fa6";
import { vehicleToKey, vehicleToLabel } from "@/lib/parseGarageVehicles";

export function GaragePanel({
  vehicles,
  loading,
  error,
  deletingKey,
  onSelectVehicle,
  onDeleteVehicle,
  onClose,
  onRetry,
}) {
  return (
    <div className="absolute top-full right-0 mt-2 w-[320px] max-w-[95vw] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
      <div className="bg-[#b91c1c] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaCar className="text-white text-lg" />
          <span className="text-white font-bold text-sm tracking-wide">My Garage</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors"
          aria-label="Close garage"
        >
          <FaXmark className="text-base" />
        </button>
      </div>

      <div className="max-h-[320px] overflow-y-auto p-2">
        {loading && (
          <p className="text-sm text-gray-500 text-center py-6">Loading your vehicles…</p>
        )}

        {!loading && error && (
          <div className="text-center py-4 px-2">
            <p className="text-sm text-red-600 mb-2">{error}</p>
            <button
              type="button"
              onClick={onRetry}
              className="text-sm font-semibold text-[#b91c1c] hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && vehicles.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-6 px-2">
            No vehicles saved yet. Use &quot;Find by Vehicle&quot; to search — they will appear here.
          </p>
        )}

        {!loading && !error && vehicles.length > 0 && (
          <ul className="list-none">
            {vehicles.map((vehicle) => {
              const label = vehicleToLabel(vehicle);
              const key = vehicleToKey(vehicle);
              const isDeleting = deletingKey === key;

              return (
                <li key={key} className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onSelectVehicle(vehicle)}
                    disabled={isDeleting}
                    className="flex-1 min-w-0 text-left px-3 py-2.5 rounded-lg text-sm text-gray-800 hover:bg-red-50 hover:text-[#b91c1c] transition-colors disabled:opacity-50"
                  >
                    {label}
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onDeleteVehicle(vehicle);
                    }}
                    disabled={isDeleting}
                    className="shrink-0 p-2.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                    aria-label={`Remove ${label} from garage`}
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
