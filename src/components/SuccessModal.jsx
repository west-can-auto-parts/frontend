import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Importing checkmark icon

function SuccessModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div id='success-modal-1' className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
                <div className="flex items-center">
                    <FaCheckCircle className="text-green-500 w-6 h-6 mr-2" />
                    <h2 className="text-lg font-semibold">Success</h2>
                </div>
                <p className="mt-2">Your message has been sent successfully!</p>
                <button
                    onClick={onClose}
                    className="mt-4 w-full rounded-md bg-green-500 px-3.5 py-2 text-sm font-semibold text-white"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default SuccessModal;
