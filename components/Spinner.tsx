
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <svg
      className="w-12 h-12 animate-spin text-purple-500"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        strokeDasharray="283"
        strokeDashoffset="212"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Spinner;
