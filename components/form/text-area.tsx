const TextArea = ({
  maxLength = 15,
  data = {},
  name,
  handleChange,
  error = {},
  placeholder,
  rows = 3,
  label,
  labelClass
}: any) => {
  return (
    <div>
      <label className={`block ${labelClass}`}>{label}</label>
      <textarea
        rows={rows}
        name={name}
        maxLength={maxLength}
        value={data[name] || ''}
        onChange={handleChange}
        className="mt-1 block w-full rounded-[6px] border border-[#E4E4E7] bg-white text-base text-[#000] font-semibold  p-4 placeholder-[#A3A3A3] placeholder-extrabold shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
        placeholder={placeholder}
      />
      <p className={`mt-2 text-xs text-pink-600 `}>{error[name] || ''}</p>
    </div>
  );
};

export default TextArea;
