import React, { useEffect, useState } from 'react';

const Toaster = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the toaster with animation
    setIsVisible(true);

    // Hide the toaster after the specified duration
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Notify parent when the toaster finishes disappearing
      setTimeout(() => {
        if (onClose) onClose();
      }, 300); // Matches the CSS animation duration
    }, duration);

    return () => clearTimeout(timer); 
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-5 right-5 z-50 px-4 py-2 rounded shadow-md text-white transition-transform duration-300 ${
        isVisible
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0'
      } ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
      style={{ minWidth: '250px' }}
    >
      {message}
    </div>
  );
};

export default Toaster;
