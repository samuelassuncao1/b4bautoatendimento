interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <div className="mb-4">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-5 h-5 text-[#003366] border-2 border-gray-300 rounded focus:ring-[#003366] focus:ring-2"
        />
        <span className="ml-3 text-gray-800">{label}</span>
      </label>
    </div>
  );
}
