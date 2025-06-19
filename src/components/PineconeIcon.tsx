import React from 'react';

interface PineconeIconProps {
  className?: string;
  size?: number;
}

const PineconeIcon: React.FC<PineconeIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2L10.5 4.5L12 7L13.5 4.5L12 2Z"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M12 7L9.5 8.5L11 11L12 9.5L13 11L14.5 8.5L12 7Z"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M12 9.5L8.5 11.5L10 14L11.5 12.5L12 13.5L12.5 12.5L14 14L15.5 11.5L12 9.5Z"
        fill="currentColor"
        opacity="0.6"
      />
      <path
        d="M12 13.5L7.5 15.5L9 18L10.5 16.5L11.5 17.5L12 16.5L12.5 17.5L13.5 16.5L15 18L16.5 15.5L12 13.5Z"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M12 16.5L6.5 18.5L8 21L9.5 19.5L11 20.5L12 19L13 20.5L14.5 19.5L16 21L17.5 18.5L12 16.5Z"
        fill="currentColor"
        opacity="0.4"
      />
      <path
        d="M12 19L8 20.5L9 22L10.5 21L12 21.5L13.5 21L15 22L16 20.5L12 19Z"
        fill="currentColor"
        opacity="0.3"
      />
    </svg>
  );
};

export default PineconeIcon;