interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email';
  placeholder?: string;
  required?: boolean;
}

export default function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  required = false
}: InputProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-800 font-semibold mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#003366] focus:outline-none"
      />
    </div>
  );
}
