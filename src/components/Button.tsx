interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false
}: ButtonProps) {
  const baseClasses = "px-6 py-3 rounded-lg font-semibold transition-all duration-200";
  const variantClasses = variant === 'primary'
    ? "bg-[#003366] text-white hover:bg-[#004488] disabled:bg-gray-400"
    : "bg-white text-[#003366] border-2 border-[#003366] hover:bg-gray-50 disabled:bg-gray-100 disabled:border-gray-400 disabled:text-gray-400";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses}`}
    >
      {children}
    </button>
  );
}
