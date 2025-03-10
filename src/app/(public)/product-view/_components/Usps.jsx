import React from 'react'
import { FaShippingFast, FaPhoneAlt, FaShieldAlt, FaTag, FaBuilding } from 'react-icons/fa';
import { FaGears } from 'react-icons/fa6';

const Usps = () => {
    return (
        < div className="text-xs py-2 w-full mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 text-center" >
            <div className="flex flex-col items-center space-x-2 bg-gray-100/50 py-4 rounded-md">
                <FaShippingFast className="h-6 w-6 text-[#b91b29]" />
                <div>
                    <p className="font-semibold">Speed and Efficiency</p>
                    <p>Delivery in under 2 Hours.</p>
                </div>
            </div>
            <div className="flex flex-col items-center space-x-2 bg-gray-100/50 py-4 rounded-md">
                <FaGears className="h-6 w-6 text-[#b91b29]" />
                <div>
                    <p className="font-semibold">Wide Selection</p>
                    <p>Access to over 2 million products.</p>
                </div>
            </div>
            <div className="flex flex-col items-center space-x-2 bg-gray-100/50 py-4 rounded-md">
                <FaShieldAlt className="h-6 w-6 text-[#b91b29]" />
                <div>
                    <p className="font-semibold">Unparalleled Quality</p>
                    <p>OEM products from 330 suppliers.</p>
                </div>
            </div>
           
        </div >
    )
}

export default Usps