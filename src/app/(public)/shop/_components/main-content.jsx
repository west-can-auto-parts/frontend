"use client";

import { useRouter } from "next/navigation";

export const MainContentView = () => {

    const router = useRouter();

    return (
        <div className="w-full md:w-4/5">
            {parts.map((autoParts, index) => (
                <div key={index} className="mb-3">
                    <p className="text-2xl font-bold mb-6">{autoParts.title}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                        {autoParts.subParts.map((product, index) => (
                            <div
                                key={index}
                                onClick={() =>
                                    router.push(`/shop/${autoParts.title}/${product.listing}`)
                                }
                                className="cursor-pointer"
                            >
                                <div className="bg-white h-full p-4 hover:shadow-md hover:scale-105 transition border border-gray-100">
                                    <img
                                        src={product.imageUrl1}
                                        alt={product.listing}
                                        className="w-full h-40 object-contain"
                                    />
                                    <h3 className="font-semibold mb-2 text-center text-sm">
                                        {product.listing}
                                    </h3>
                                    <p className="text-gray-500 text-center text-xs">
                                        <span className="text-center">View Products</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}