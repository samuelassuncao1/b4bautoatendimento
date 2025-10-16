interface MultiSelectProps {
  label: string;
  selectedValues: string[];
  onChange: (values: string[]) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}

export default function MultiSelect({
  label,
  selectedValues,
  onChange,
  options,
  required = false
}: MultiSelectProps) {
  const toggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter(v => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-800 font-semibold mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="border-2 border-gray-300 rounded-lg p-4 max-h-64 overflow-y-auto">
        {options.map((option) => (
          <label key={option.value} className="flex items-start cursor-pointer mb-3 last:mb-0">
            <input
              type="checkbox"
              checked={selectedValues.includes(option.value)}
              onChange={() => toggleOption(option.value)}
              className="w-5 h-5 text-[#003366] border-2 border-gray-300 rounded focus:ring-[#003366] focus:ring-2 mt-0.5 flex-shrink-0"
            />
            <span className="ml-3 text-gray-800 text-sm leading-tight">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
