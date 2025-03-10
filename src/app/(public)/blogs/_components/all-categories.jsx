import React from 'react';

export const AllCategories = ({ categories }) => {
    return (
        <div className="bg-white p-4 shadow-md rounded-md">
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="list-none flex flex-wrap text-xs gap-2">
                {categories.map((category, index) => (
                    <li key={index} className="text-xs text-white bg-[#b91b29] px-2 py-1 rounded-md">
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};


