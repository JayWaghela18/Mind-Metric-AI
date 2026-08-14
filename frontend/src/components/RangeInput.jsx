const RangeInput = ({ label, id, value, onChange, min = 0, max = 24, step = 0.5, error, required, unit }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={id} className="label-text mb-0">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <span className="text-lg font-semibold text-slate-900">
          {value} {unit}
        </span>
      </div>
      <input
        id={id}
        type="range"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        required={required}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
      />
      <div className="flex justify-between text-xs text-slate-500 mt-2">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default RangeInput;
