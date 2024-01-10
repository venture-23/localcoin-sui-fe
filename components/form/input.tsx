const InputForm = ({
  maxLength = 15,
  data = {},
  inputMode,
  name,
  handleChange,
  error = {},
  type = 'text',
  placeholder,
  label,
  labelClass,
  inputCSS,
  readOnly = false
}: any) => {
  return (
    <div>
      <label className={`block ${labelClass}`}>{label}</label>
      <input
        {...((readOnly && { readOnly }) || {})}
        type={type}
        name={name}
        maxLength={maxLength}
        {...((inputMode && { inputMode: 'numeric' }) || {})}
        value={data[name] || ''}
        onChange={handleChange}
        className={`mt-1 block w-full rounded-[6px] border border-[#E4E4E7] bg-white text-[#000] text-base font-semibold  p-4 placeholder-[#A3A3A3] placeholder-extrabold shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm ${inputCSS}`}
        placeholder={placeholder}
      />
      <p className={`mt-2 text-xs text-pink-600 `}>{error[name] || ''}</p>
    </div>
  );
};

export default InputForm;
