import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useRouter, usePathname } from 'next/navigation';

export const ModelList = ({ modelList = [] }) => {
    const [selectedModel, setSelectedModel] = useState(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname) {
            const modelSlug = pathname.split('/model/')[1];
            if (modelSlug) {
                const modelName = modelSlug.split('-').slice(1).join('-');
                const matchingModel = modelList.find(model =>
                    stringToSlug(model) === modelName.toLowerCase()
                );
                if (matchingModel) setSelectedModel(matchingModel);
            }
        }
    }, [pathname, modelList]);

    const stringToSlug = (str) => {
        if (!str) return '';
        return str
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/--+/g, '-');
    };

    const handleModelClick = (modelName) => {
        setSelectedModel(modelName);
        const vehicleName = pathname.split('/model/')[1].split('-')[0];
        router.push(`/model/${vehicleName}-${stringToSlug(modelName)}`);
    };

    return (
        <div className="border-b-2 px-6 py-6 bg-red-800 text-white border-b-white shadow-sm">
            <h3 className="text-sm font-semibold mb-4">All Models</h3>

            {/* Desktop View - hidden on mobile */}
            <div className="hidden sm:block">
                <DesktopView
                    modelList={modelList}
                    selectedModel={selectedModel}
                    handleModelClick={handleModelClick}
                />
            </div>

            {/* Mobile View - visible only on mobile */}
            <div className="sm:hidden">
                <MobileView
                    modelList={modelList}
                    selectedModel={selectedModel}
                    handleModelClick={handleModelClick}
                />
            </div>
        </div>
    );
};

// Desktop View Component
const DesktopView = ({ modelList, selectedModel, handleModelClick }) => (
    <ul
        className="list-none pb-3 space-y-2 h-[250px] overflow-y-auto
                   scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-red-800"
        style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#d1d5db #7f1d1d',
        }}
    >
        {modelList.map((modelName) => (
            <li
                key={modelName}
                className={`cursor-pointer p-1 rounded text-sm ${
                    modelName === selectedModel
                        ? 'font-bold text-white'
                        : 'hover:bg-white hover:text-red-800'
                }`}
                onClick={() => handleModelClick(modelName)}
            >
                {modelName}
            </li>
        ))}
    </ul>
);

// Mobile View Component
const MobileView = ({ modelList, selectedModel, handleModelClick }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsDropdownOpen(prev => !prev)}
                className="bg-white p-2 w-full text-left rounded-md flex justify-between items-center"
            >
                <span className="text-sm font-semibold text-red-800">
                    {selectedModel || "Select a Model"}
                </span>
                <FaChevronDown
                    className={`h-3 w-3 text-red-800 transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isDropdownOpen && (
                <ul className="absolute z-50 bg-red-800 w-full mt-1 rounded-md shadow-lg border border-white max-h-60 overflow-y-auto">
                    {modelList.map((modelName) => (
                        <li
                            key={modelName}
                            className={`py-2 px-4 text-sm cursor-pointer ${
                                modelName === selectedModel
                                    ? "bg-white text-red-800 font-bold"
                                    : "text-white hover:bg-white hover:text-red-800"
                            }`}
                            onClick={() => {
                                handleModelClick(modelName);
                                setIsDropdownOpen(false);
                            }}
                        >
                            {modelName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};