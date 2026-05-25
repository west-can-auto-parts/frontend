import Link from "next/link";

export function EmptyState({ vehicleLabel }) {
  return (
    <div className="flex flex-col items-center justify-center text-center
                    py-20 px-6 bg-white rounded-xl border border-gray-200">

      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-5">
        <svg
          className="w-8 h-8 text-[#b91c1c]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h2 className="text-lg font-bold text-gray-900 mb-2">No Parts Found</h2>

      <p className="text-sm text-gray-500 max-w-sm mb-6">
        {vehicleLabel
          ? `We couldn't find any parts for ${vehicleLabel}. Try a different vehicle or browse all parts.`
          : "No parts match your current search. Try adjusting your filters."}
      </p>

      <Link
        href="/parts"
        className="px-6 py-2.5 bg-[#b91c1c] text-white rounded-lg text-sm
                   font-semibold hover:bg-red-800 transition-colors"
      >
        Browse All Parts
      </Link>
    </div>
  );
}