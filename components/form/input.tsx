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
  labelClass
}: any) => {
  return (
    <div>
      <label className={`block ${labelClass}`}>{label}</label>
      <input
        type={type}
        name={name}
        maxLength={maxLength}
        {...((inputMode && { inputMode: 'numeric' }) || {})}
        value={data[name] || ''}
        onChange={handleChange}
        className="mt-1 block w-full rounded-[4px] border border-slate-300 bg-white  p-4 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
        placeholder={placeholder}
      />
      <p className={`mt-2 text-xs text-pink-600 `}>{error[name] || ''}</p>
    </div>
  );
};

export default InputForm;
