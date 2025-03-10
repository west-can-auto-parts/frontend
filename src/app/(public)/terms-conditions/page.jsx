"use client";

import React, { useState } from 'react';

const termsData = [
  {
    question: "Permitted Use",
    answer:
      "We only authorize you to visit, view, and retain a copy of pages from this site for your own personal use. You shall not duplicate, download, publish, modify, or otherwise distribute the material on this site for any purpose other than for personal use. Please ensure you are above 18 years old to use our website. Customers below 18 are not allowed to transact or create an account with us.",
  },
  {
    question: "Prices",
    answer:
      "Prices at West Can Auto Parts are in Canadian Dollar only. We reserve the right to issue price lists and modify prices based on market fluctuations and supplier pricing updates, without prior notice. The prices listed on our website do not include delivery and handling charges, which will be calculated and displayed during checkout.",
  },
  {
    question: "Returns and Exchange",
    answer:
      "We do not accept returns if the parts or products are in: 1) Damaged condition. 2) Used condition. 3) Without the original manufacturer’s box. 4) Without the payment receipt to prove the purchase. 5) If the return window is more than 30 business days from the date of purchase or pickup. 6) For core returns, it should be made within 90 business days from the date of pickup or delivery.",
  },
  {
    question: "Warranty",
    answer:
      "Our warranty policy covers parts or products within the manufacturer's warranty period, or an extended warranty in special cases. Warranty claims are valid only for manufacturing defects. No warranty is available for parts or products with wear and tear, damage, or cracks. The original manufacturer’s box is required for warranty claims.",
  },
  {
    question: "Cancellation of Order",
    answer:
      "You have the right to cancel or modify your order for any reason. However, we will not be able to cancel or modify orders once they are processed on our end.",
  },
  {
    question: "Home Delivery and In-Store Pickup",
    answer:
      "Home deliveries are available for a minimal cost, depending on the distance from our store to your location. In-store pickup is also available, subject to the availability of parts and products at the specific store.",
  },
];

const TermsAndConditions = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mx-auto my-8">
      <div className="bg-white shadow-lg rounded-lg">
        {termsData.map((item, index) => (
          <div key={index}>
            <div
              className={`flex items-center justify-between p-6 cursor-pointer transition ${openIndex === index ? 'bg-[#b12b29] text-white' : 'bg-white'} border-b`}
              onClick={() => handleToggle(index)}
            >
              <h2 className="text-lg font-semibold">{item.question}</h2>
              <span
                className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
              >
                <svg
                  className="w-6 h-6 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </div>
            {openIndex === index && (
              <div className="p-6 bg-white border-b">
                <p className="text-sm">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsAndConditions;
