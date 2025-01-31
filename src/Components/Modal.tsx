import React from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position: { top: number; left: number };
}

const Modal = ({ isOpen, onClose, children, position }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute bg-gray-50 shadow-lg border border-gray-200 rounded-lg p-4 w-64 z-50"
      style={{ top: position.top, left: position.left }}
    >
      <button className="absolute right-3 top-1" onClick={onClose}>
        &#x2715;
      </button>
      {children}
    </div>
  );
};

export default Modal;
