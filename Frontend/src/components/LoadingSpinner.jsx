export default function LoadingSpinner({ size = 'md', color = 'green' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const colorClasses = {
    green: 'border-green-500',
    blue: 'border-blue-500',
    gray: 'border-gray-500'
  };

  return (
    <div className="flex justify-center items-center">
      <div 
        className={`animate-spin rounded-full border-b-2 ${sizeClasses[size]} ${colorClasses[color]}`}
        aria-label="Loading"
      ></div>
    </div>
  );
}