interface TextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}

export default function Textarea({
  label,
  value,
  onChange,
  placeholder = '',
  rows = 4,
  required = false
}: TextareaProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-800 font-semibold mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#003366] focus:outline-none resize-vertical"
      />
    </div>
  );
}
