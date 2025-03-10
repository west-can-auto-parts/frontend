"use client";

import React, { useState } from 'react';

const privacyData = [
  {
    question: "Personal Information We Collect Directly From You",
    answer:
      "We collect and store data provided by you in relation to any queries or purchases that you make. This includes your name, email id, address, phone numbers, payment information, images, videos, and so on. Rest assured, this data is in safe hands, and we do not sell or lease any personal information. We employ industry-standard security measures to safeguard your data from unauthorized access or disclosure. Our website utilizes encryption technology to ensure that your transactions are safe and your payment information remains confidential.",
  },
  {
    question: "Personal Information Collected Automatically",
    answer:
      "We may use cookies to personalize your shopping experience and provide tailored recommendations based on your preferences. These cookies do not contain personally identifiable information. Additionally, we collect the IP (Internet Protocol) addresses of all visitors to our websites and other related information such as page requests, browser type, operating system, and average time spent on our website. We use this information to help us understand our website activity and to monitor and improve our website.",
  },
  {
    question: "Information Collected Through Third Parties",
    answer:
      "We may obtain information collected from third parties like marketing agencies and analytics providers. Another source is delivery partners as a result of address changes or name changes. This includes publicly available information and data from trusted third-party partners. Rest assured, we handle this information securely and use it solely for the purpose of improving our services. We respect your privacy and are committed to protecting your personal information.",
  },
  {
    question: "Your Rights And Control Over Information",
    answer:
      "You have the right to know about your information and even control the information that is stored with us. This can be done by directly calling us or by mailing us using the contact information provided on the website. Your rights and control over information include: 1) To check what data we have about you, if any. 2) Express any concern about the data we have about you. 3) Deleting data about you that is stored with us. 4) Change or correct your data when required.",
  },
  {
    question: "How Do We Use Your Information?",
    answer:
      "With your information provided by you or sourced automatically, we use it for these purposes only: 1) To manage and create orders with us. 2) To communicate with the customer service team related to any issues. 3) To prevent your account from fraud. 4) Processing refunds, returns, and exchanges. 5) Provide marketing services to you about promotions, discounts, and ongoing offers.",
  },
];

const PrivacyPolicy = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mx-auto my-8">
      <div className="bg-white shadow-lg rounded-lg">
        {privacyData.map((item, index) => (
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

export default PrivacyPolicy;
