const StarIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 25 25"
    fill="none"
    className={`star-icon flex-shrink-0 ${className}`}
  >
    <path
      d="M12.5 0C11.9427 11.4844 11.4844 11.9427 0 12.5C11.4844 13.0573 11.9427 13.5156 12.5 25C13.0573 13.5156 13.5156 13.0573 25 12.5C13.5156 11.9427 13.0573 11.4844 12.5 0Z"
      fill="currentColor"
    />
  </svg>
);

export default StarIcon;
