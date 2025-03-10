"use client"

import React, { useState } from 'react';

const data = [
  {
    question: "What is West Can Auto Parts?",
    answer: "West Can Auto Parts is a Canadian Replacement Parts distributor with over 40 years of experience. They offer access to over two million auto parts and related accessories. Known for their expertise, they lead in aftermarket Replacement Parts, tools, industrial equipment, safety supplies, and accessories. Their tight-knit team is dedicated to staying on top of technological trends to deliver the best to their customers."
  },
  {
    question: "What modes of payment does West Can Auto Parts accept?",
    answer: "They accept various payment methods, including credit/debit cards and online payment systems."
  },
  {
    question: "Does West Can Auto have a store of its own?",
    answer: "Yes, they have multiple physical store locations across Canada."
  },
  {
    question: "How much does delivery to home cost and how much time does it take to get delivered?",
    answer: "Delivery costs and times vary depending on location and the order's size. Check their website for specific details."
  },
  {
    question: "How to return a part and what is the return window?",
    answer: "Returns can be made by contacting customer service within 30 days of purchase. Refer to their return policy for detailed instructions."
  },
  {
    question: "What is a core part?",
    answer: "A core part is an old part returned by the customer that is needed for a replacement part to be sold. It is often refurbished or recycled."
  },
  {
    question: "How to return a core part and what is the return window?",
    answer: "Core parts should be returned within 30 days of purchase. Follow their core return policy for specific instructions."
  },
  {
    question: "If parts or tools are delivered home, will I be able to pay with Cash on Delivery (COD)?",
    answer: "Check with West Can Auto Parts for availability of Cash on Delivery (COD) as payment option."
  }
];

const WestCanAutoPartsInfo = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mx-auto my-8">
      <div className="bg-white shadow-lg rounded-lg">
        {data.map((item, index) => (
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

export default WestCanAutoPartsInfo;
