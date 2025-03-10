import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa'; // Importing exclamation icon

function FailureModal({ isOpen, onClose, errorMessage }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
                <div className="flex items-center">
                    <FaExclamationCircle className="text-red-500 w-6 h-6 mr-2" />
                    <h2 className="text-lg font-semibold">Error</h2>
                </div>
                <p className="mt-2">{errorMessage || 'An error occurred. Please try again.'}</p>
                <button
                    onClick={onClose}
                    className="mt-4 w-full rounded-md bg-red-500 px-3.5 py-2 text-sm font-semibold text-white"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default FailureModal;
