import Button from 'components/botton';
import Image from 'next/image';
import Link from 'next/link';

const MerchantInfo = ({ title, handleChange, handleSubmit, error, data }: any) => {
  return (
    <div className="bg-white">
      <div className="rounded-top-[4px]">
        <div className="relative">
          <Image
            alt="heading image"
            width={388}
            height={234}
            src={'/heading_bg.png'}
            className="!w-full"
          />
          <div className="absolute left-7 top-7 w-[90%] ">
            <h1 className=" text-heading !text-white">
              <span className="font-normal">Please enter your</span> Merchant details{' '}
              <span className="font-normal"> below.</span>{' '}
            </h1>
          </div>
        </div>
      </div>
      {/* <div className="mb-6">
        <h1 className="mb-2 text-2xl font-bold">{title}</h1>
        <p className="max-w-sm text-gray-700">Please enter your details below.</p>
      </div> */}

      <div className="mt-8 grid gap-5 px-6 pb-6">
        <label className="block">
          <span className="text-color block text-sm font-medium after:ml-0.5 after:text-red-500 ">
            Store Name
          </span>
          <input
            type="text"
            name="storeName"
            maxLength={300}
            value={data.storeName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-[4px] border border-slate-300 bg-white p-4  text-base placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            placeholder="Enter Store Name"
          />
          <p className={` mt-2 text-xs text-pink-600 peer-invalid:visible`}>{error.storeName}</p>
        </label>
        <label className="block">
          <span className="text-color block text-sm font-medium after:ml-0.5 after:text-red-500 ">
            Proprietary Name
          </span>
          <input
            type="text"
            onChange={handleChange}
            name="proprietaryName"
            maxLength={300}
            value={data.proprietaryName}
            className="mt-1 block w-full rounded-[4px] border border-slate-300 bg-white  p-4 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            placeholder="Enter Proprietary Name"
          />
          <p className={` mt-2 text-xs text-pink-600 peer-invalid:visible`}>
            {error.proprietaryName}
          </p>
        </label>
        <label className="block">
          <span className="text-color block text-sm font-medium after:ml-0.5 after:text-red-500 ">
            Phone Number
          </span>
          <input
            type="number"
            name="phoneNumber"
            maxLength={15}
            value={data.phoneNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-[4px] border border-slate-300 bg-white  p-4 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            placeholder="Enter Phone Number"
          />
          <p className={`mt-2 text-xs text-pink-600 `}>{error.phoneNumber}</p>
        </label>

        <div onClick={handleSubmit}>
          <Button text="Sign up" />
        </div>
      </div>
    </div>
  );
};

export default MerchantInfo;
