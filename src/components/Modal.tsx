import React, { useEffect, useRef } from 'react'

const Modal: React.FC<{ open: boolean; onClose: () => void; children?: React.ReactNode }> = ({ open, onClose, children }) => {
  
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: PointerEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("pointerdown", handleOutsideClick);
    }

    return () =>
      document.removeEventListener("pointerdown", handleOutsideClick);
  }, [open, onClose]);

  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 px-4">
      <div ref={modalRef} className="bg-gray-200 rounded-2xl w-1/2 max-w-sm p-2 pb-5 modal-pop relative">
        {/* <button aria-label="Close" onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">✕</button> */}
        {children}
      </div>
    </div>
  )
}

export default Modal
