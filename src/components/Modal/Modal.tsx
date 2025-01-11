import React from 'react';
import ReactDOM from 'react-dom';

import { useModalStore } from '../../store/modalStore';

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const { modalType, closeModal } = useModalStore();

  if (!modalType) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={closeModal}
    >
      <div
        className="min-w-125 rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')!,
  );
};

export default Modal;
