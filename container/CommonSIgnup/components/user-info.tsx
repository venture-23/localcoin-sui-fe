const MerchantInfo = ({ title, handleChange, handleSubmit, error, data }: any) => {
  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="mb-2 text-2xl font-bold">{title}</h1>
        <p className="max-w-sm text-gray-700">Please enter your details below.</p>
      </div>

      <div className="grid  gap-4">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 after:ml-0.5 after:text-red-500 ">
            Store Name
          </span>
          <input
            type="text"
            name="storeName"
            maxLength={300}
            value={data.storeName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            placeholder="Enter Store Name"
          />
          <p className={` mt-2 text-sm text-pink-600 peer-invalid:visible`}>{error.storeName}</p>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 after:ml-0.5 after:text-red-500 ">
            Proprietary Name
          </span>
          <input
            type="text"
            onChange={handleChange}
            name="proprietaryName"
            maxLength={300}
            value={data.proprietaryName}
            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            placeholder="Enter Proprietary Name"
          />
          <p className={` mt-2 text-sm text-pink-600 peer-invalid:visible`}>
            {error.proprietaryName}
          </p>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 after:ml-0.5 after:text-red-500 ">
            Phone Number
          </span>
          <input
            type="number"
            name="phoneNumber"
            maxLength={15}
            value={data.phoneNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            placeholder="Enter Phone Number"
          />
          <p className={`mt-2 text-sm text-pink-600 `}>{error.phoneNumber}</p>
        </label>
        <button onClick={handleSubmit} type="button" className=" rounded-full">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default MerchantInfo;
