import React, { useState } from 'react'

export const PartSupplier = ({ suppliers, mySubPart }) => {
    const [showMore, setShowMore] = useState(false);
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    // Filter suppliers by the current subPart's listing
    const filteredSuppliers = suppliers.filter(supplier =>
        supplier.categories.some(category => category.name === mySubPart.listing)
    );

    // Show limited suppliers on mobile, all on desktop
    const suppliersToDisplay = isMobile && !showMore ? filteredSuppliers.slice(0, 4) : filteredSuppliers;

    return (
        <div>
            <p className="text-xl font-bold py-2 md:py-4">
                Our Suppliers
            </p>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {suppliersToDisplay.map((supplier, index) => (
                    supplier.logoUrl ? (
                        <div key={index} className='bg-white p-3'>
                            <div
                                className="bg-white h-[100px] bg-contain bg-no-repeat bg-center p-2"
                                style={{ backgroundImage: `url(${supplier.logoUrl})` }}
                            />
                            <p className='text-center text-xs text-gray-500 font-semibold'>{supplier.brand}</p>
                        </div>
                    ) : null
                ))}
            </div>

            {/* Button to show more suppliers on mobile */}
            {isMobile && !showMore && filteredSuppliers.length > 4 && (
                <button
                    onClick={() => setShowMore(true)}
                    className="mt-4 text-[#b21b29] font-semibold"
                >
                    View More
                </button>
            )}

            {/* Button to collapse back the suppliers list */}
            {isMobile && showMore && (
                <button
                    onClick={() => setShowMore(false)}
                    className="mt-4 text-[#b21b29] font-semibold"
                >
                    View Less
                </button>
            )}
        </div>
    )
}
