const SelectInput = ({ label, id, value, onChange, options, error, required, placeholder }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="label-text">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className={error ? 'input-field-error' : 'input-field'}
      >
        <option value="">{placeholder || `Select ${label.toLowerCase()}...`}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default SelectInput;
