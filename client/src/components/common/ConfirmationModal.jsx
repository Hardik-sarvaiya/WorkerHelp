
import React from "react";

const ConfirmationModal = ({ modalData }) => {
  if (!modalData) return null;

  // Close modal if user clicks outside the modal content
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      modalData.btn2Handler();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]"
      onClick={handleOverlayClick}
    >
      <div className="bg-gray-800 text-gray-100 p-6 rounded-lg shadow-lg w-[90%] max-w-sm">
        <h2 className="text-lg font-semibold mb-2">{modalData.text1}</h2>
        <p className="text-sm mb-4">{modalData.text2}</p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={modalData.btn2Handler}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors duration-200"
          >
            {modalData.btn2Text}
          </button>
          <button
            type="button"
            onClick={modalData.btn1Handler}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors duration-200"
          >
            {modalData.btn1Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
