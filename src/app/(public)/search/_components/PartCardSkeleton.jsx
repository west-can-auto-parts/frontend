export function PartCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col
                    overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="aspect-square bg-gray-100" />

      <div className="p-4 flex flex-col gap-3">
        {/* Manufacturer */}
        <div className="h-3 bg-gray-200 rounded w-1/3" />

        {/* Name + part number */}
        <div className="space-y-1.5">
          <div className="h-4 bg-gray-200 rounded w-4/5" />
          <div className="h-4 bg-gray-200 rounded w-3/5" />
          <div className="h-3 bg-gray-100 rounded w-1/4 mt-1" />
        </div>

        {/* Description lines */}
        <div className="space-y-1">
          <div className="h-3 bg-gray-100 rounded" />
          <div className="h-3 bg-gray-100 rounded w-5/6" />
        </div>

        {/* Tags */}
        <div className="flex gap-1 mt-1">
          <div className="h-5 w-12 bg-gray-100 rounded-full" />
          <div className="h-5 w-16 bg-gray-100 rounded-full" />
          <div className="h-5 w-10 bg-gray-100 rounded-full" />
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="h-7 w-20 bg-gray-200 rounded" />
          <div className="h-8 w-20 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}