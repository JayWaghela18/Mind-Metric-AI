const ButtonGroup = ({ label, value, onChange, options, error, required }) => {
  return (
    <div className="w-full">
      <p className="label-text">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              value === option
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default ButtonGroup;
