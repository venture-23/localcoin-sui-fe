'use client';
import Button from 'components/botton';
import InputForm from 'components/form/input';
import TextArea from 'components/form/text-area';

const MerchantRegisterInfo = ({
  title,
  handleChange,
  handleSubmit,
  error = {},
  data = {},
  loader
}: any) => {

  const isDataNotFilled = () => {
    const isNotFilled = data.proprietor === '' || data.phone_no === '' || data.location === '' || data.store_name === ''
    return isNotFilled
  }
  return (
    <div className="">
      <div className="relative ">
        <h3 className="mb-2 text-2xl font-bold">{title || 'Apply to become a merchant'}</h3>
      </div>
      <div className="mt-1 grid gap-5 pb-6">
        <InputForm
          // label="Store Name"
          type="text"
          error={error}
          name="store_name"
          maxLength={300}
          data={data}
          handleChange={handleChange}
          className="mt-1 block w-full rounded-[4px] border border-slate-300 bg-white p-4  text-base placeholder-[#A3A3A3] placeholder-extrabold shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          placeholder="Enter Store Name"
        />
        <InputForm
          type="text"
          error={error}
          handleChange={handleChange}
          name="proprietor"
          maxLength={300}
          data={data}
          className="mt-1 block w-full rounded-[4px] border border-slate-300 bg-white  p-4 placeholder-[#A3A3A3] placeholder-extrabold shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
          placeholder="Enter Store Owner Name"
          // label="Store Owner Name"
        />
        <InputForm
          inputMode="numeric"
          type="number"
          error={error}
          // label="Phone Number"
          name="phone_no"
          maxLength={15}
          data={data}
          handleChange={handleChange}
          className="mt-1 block w-full rounded-[4px] border border-slate-300 bg-white  p-4 placeholder-[#A3A3A3] placeholder-extrabold shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
          placeholder="Enter Phone Number"
        />
        <TextArea
          // label="Store Address"
          type="text"
          rows={4}
          error={error}
          name="location"
          maxLength={225}
          data={data}
          handleChange={handleChange}
          className="mt-1 block w-full rounded-[4px] border border-slate-300 bg-white  p-4 placeholder-[#A3A3A3] placeholder-extrabold shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
          placeholder="Enter Store Address"
        />

        <label className='block flex items-center'>
          <input 
            type='checkbox'
            name='correctInfoCheck'
            onChange={handleChange}
            // checked={data.correctInfoCheck}
            className='rounded-md border border-gray-300 bg-white p-2'
            disabled={isDataNotFilled()}
          />

          <span className='ml-[6px] text-base font-medium text-[#171717]'>My merchant information is correct.</span>
        </label>

        <div onClick={handleSubmit}>
          <Button showLoader={loader} disabled={!data.correctInfoCheck || loader} text="Continue" />
        </div>
      </div>
    </div>
  );
};

export default MerchantRegisterInfo;
