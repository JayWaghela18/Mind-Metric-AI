const FormInput = ({ label, id, type = 'text', value, onChange, min, max, step, error, required }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="label-text">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        required={required}
        className={error ? 'input-field-error' : 'input-field'}
        placeholder={label}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default FormInput;
