interface ToggleProps {
    label?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
  }
  
  export const Toggle: React.FC<ToggleProps> = ({
    label,
    checked,
    onChange,
  }) => {
    return (
      <label className="flex items-center cursor-pointer gap-2">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
          <div className={`
            w-14 h-7 rounded-full transition-colors duration-200 ease-in-out
            ${checked ? 'bg-blue-600' : 'bg-gray-200'}
          `}>
            <div className={`
              absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md
              transform transition-transform duration-200 ease-in-out
              ${checked ? 'translate-x-7' : 'translate-x-0'}
            `} />
          </div>
        </div>
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </label>
    );
  };