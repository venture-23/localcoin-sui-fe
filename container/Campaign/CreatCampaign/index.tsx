'use client';
// import { Popover } from '@headlessui/react';
import Button from 'components/botton';
// import PopupBox from 'components/popover';

import Select from 'components/select';
import { useMyContext } from 'hooks/useMyContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { campaignServices } from 'services/campaign-services';

const CreateCampaignPage = () => {
  const router = useRouter();

  const { userInfo } = useMyContext();
  const [showLoader, setShowLoader] = useState(false);
  const [data, setData] = useState({
    name: '',
    totalAmount: '',
    recipients: '',
    description: '',
    creatorAddress: ''
  });
  const [error, setError] = useState<any>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = e;
    delete error[name];
    setData({ ...data, [name]: value });
  };
  const validation = () => {
    const err: any = {};
    if (!data.name) err.name = 'Enter Token Name';
    if (!data.totalAmount) err.totalAmount = 'Enter No of Token';
    if (!data.recipients) err.recipients = 'Enter Recipients';
    if (!data.description) err.description = 'Enter Description';
    return err;
  };
  const handleSubmit = async () => {
    const errorChecked = validation();
    setError(errorChecked);
    if (Object.keys(errorChecked).length === 0) {
      setShowLoader(true);
      campaignServices.createCampaigns(data, userInfo.secretKey, userInfo.publicKey).then((x) => {
        if (x._value === undefined) {
          setShowLoader(false);
          console.log(x);
          router.push('/campaign');
        }
      });
    }
  };
  return (
    <section>
      <div className="container mx-auto">
        <div className="rounded-top-[4px]">
          <div className="relative">
            <Image
              alt="heading image"
              width={388}
              height={104}
              src={'/heading_bg.png'}
              className="!w-full"
            />
            <div className="absolute left-7 top-7 w-[90%] ">
              <h1 className=" text-xl !text-white">
                <span className="font-normal">Please provide</span> following details details to{' '}
                <span className="font-normal"> create camapaign.</span>{' '}
              </h1>
            </div>
          </div>
        </div>
        {showLoader && <div>Processing . . . . . </div>}
        <div className="grid gap-5 bg-white px-6 pb-6 pt-8">
          <label className="block">
            <input
              type="text"
              name="name"
              maxLength={300}
              value={data.name || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-[4px] border border-slate-300 bg-white p-4  text-base placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              placeholder="Enter Token Name"
            />
            <p className={` mt-2 text-xs text-pink-600 peer-invalid:visible`}>{error.name}</p>
          </label>

          <Select />

          <label className="block">
            <input
              type="number"
              name="recipients"
              inputMode="numeric"
              maxLength={15}
              value={data.recipients || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-[4px] border border-slate-300 bg-white  p-4 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="No of Recipients"
            />
            <p className={`mt-2 text-xs text-pink-600 `}>{error.recipients}</p>
          </label>
          <label className="block">
            <textarea
              rows={3}
              name="description"
              maxLength={300}
              value={data.description || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-[4px] border border-slate-300 bg-white  p-4 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Campaign Description"
            />
            <p className={`mt-2 text-xs text-pink-600 `}>{error.description}</p>
          </label>
          <label className="block">
            <input
              type="number"
              inputMode="numeric"
              onChange={handleChange}
              name="totalAmount"
              maxLength={300}
              value={data.totalAmount || ''}
              className="mt-1 block w-full rounded-[4px] border border-slate-300 bg-white  p-4 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Total Amount "
            />
            <p className={` mt-2 text-xs text-pink-600 peer-invalid:visible`}>
              {error.totalAmount}
            </p>
          </label>
          <div onClick={handleSubmit}>
            <Button disabled={showLoader} text="Create" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateCampaignPage;
