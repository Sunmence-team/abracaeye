import React from "react";
import ReactDOM from "react-dom";

interface modalProps {
  children: React.ReactNode;
  onClose: () => void;
  showClose?: boolean;
  customMode?: boolean;
}

const Modal = ({ children, onClose, showClose=true, customMode=false }: modalProps) => {
  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    console.error('The "modal-root" element was not found in the DOM.');
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/80 z-9999 flex items-center justify-center p-4">
      {
        customMode ? (
          children
        ) : (
          <div
            className="
              bg-white md:p-8 p-4 
              lg:w-1/2 md:w-3/4 w-full 
              rounded-2xl relative 
              max-h-[90vh] overflow-y-auto styled-scrollbar
            "
          >
            {
              showClose && (
                <button
                  onClick={onClose}
                  type="button"
                  className="absolute z-100 md:top-8 md:right-8 top-4 right-4 text-pryClr transition-colors cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )
            }

            {children}
          </div>
        ) 
      }
    </div>,
    modalRoot
  );
};

export default Modal;
