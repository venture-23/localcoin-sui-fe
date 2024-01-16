'use client';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
// import { Popover } from '@headlessui/react';
import Button from 'components/botton';
import InputForm from 'components/form/input';
import TextArea from 'components/form/text-area';
// import PopupBox from 'components/popover';

import { useMyContext } from 'hooks/useMyContext';
import { useRouter } from 'next/navigation';
import { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { campaignServices } from 'services/campaign-services';

import { ConfirmationScreen } from 'components/confirmationScreen';
import 'react-datepicker/dist/react-datepicker.css';

const CreateCampaignPage = () => {
  const router = useRouter();
  const [creatorAddressList, setCreatorAddressList] = useState([]);
  const [data, setData] = useState({
    name: '',
    totalAmount: '',
    participant: '',
    description: '',
    tokenAddress: '',
    tokenName: '',
    endingDate: new Date(),
    endingDateStr: '',
    correctInfoCheck: false,
    location: ''
  });

  const { userInfo } = useMyContext();

  useEffect(() => {
    if (userInfo.secretKey) {
      campaignServices
        .getTokenNameAddress(userInfo.publicKey)
        .then((x) => {
          console.log({ x });
          setCreatorAddressList(x);
          setData({ ...data, tokenAddress: creatorAddressList[0]?.value})
        })
        .catch(() => toast.error('Error from get_address_name'));
    }
  }, [userInfo]);

  console.log(creatorAddressList, ':cre')

  const [showLoader, setShowLoader] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [error, setError] = useState<any>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = e;
    delete error[name];
    if (name === 'correctInfoCheck') {
      setData({ ...data, [name]: !data.correctInfoCheck });
    } else {
      setData({ ...data, [name]: value });
    }
  };
  const validation = () => {
    const err: any = {};
    if (!data.name) err.name = 'Enter Token Name';
    if (!data.totalAmount) err.totalAmount = 'Enter No of Token';
    if (!data.participant) err.participant = 'Enter Recipients';
    if (!data.description) err.description = 'Enter Description';
    return err;
  };
  const handleSubmit = async () => {
    const errorChecked = validation();
    setError(errorChecked);
    if (Object.keys(errorChecked).length === 0) {
      setShowLoader(true);
      campaignServices
        .createCampaigns(data, userInfo.secretKey, userInfo.publicKey)
        .then((x) => {
          console.log(x);
          if (x._value === undefined) {
            setShowLoader(false);
            console.log(x);
            toast.success('Created a Campaign');
            // router.push('/campaign');
            setShowSuccess(true);
          }
        })
        .catch((x) => {
          setShowLoader(false);
          toast.error('Error while creating');
        });
    }
  };
  const handleDropdown = (value) => {
    console.log(value, ':val');
    setData({ ...data, tokenAddress: value.value, tokenName: value.name });
  };

  const CustomInput = forwardRef(({ value, onClick }: any, ref) => {
    return (
      <input
        value={value}
        onClick={onClick}
        placeholder={'Ending Date'}
        ref={ref}
        className={`placeholder-extrabold mt-1 block w-full rounded-[6px] border border-[#E4E4E7] bg-white p-4 text-base  font-semibold text-[#000] placeholder-[#A3A3A3] shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm`}
      />
    );
  });

  CustomInput.displayName = 'CustomInput';

  console.log(data, ':data');

  return (
    <section>
      {showSuccess ? (
        <ConfirmationScreen text="Your campaign is now live. Participants can now join your campaign to earn rewards. If you have any questions, please email admin@localcoin.us" />
      ) : (
        <div className="container mx-auto">
          {/* <PageHeader backLink={`/campaign`} /> */}
          <div onClick={() => router.back()} className="my-[18px] flex cursor-pointer items-center">
            <ChevronLeftIcon width={16} height={16} />
            <span className="text-[12px] font-normal">Back</span>
          </div>

          <div className="rounded-top-[4px]">
            <div className="relative">
              {/* <Image
              alt="heading image"
              width={388}
              height={104}
              src={'/heading_bg.png'}
              className="!w-full"
            /> */}
              {/* <div
              className="left-7 top-7 p-6"
              style={{ backgroundImage: 'url("/heading_bg.png")', backgroundSize: 'cover' }}
            >
              <h1 className=" text-2xl font-bold  !text-white">
                <span className="font-normal ">Please provide</span> following details to{' '}
                <span className="font-normal"> create camapaign.</span>{' '}
              </h1>
            </div> */}

              <div>
                <h3 className="text-lg font-semibold">Start a Campaign</h3>
              </div>
            </div>
          </div>
          <div className="grid gap-5 pb-6 pt-8">
            <InputForm
              name="name"
              // label={'Title'}
              // labelClass={'!mb-[2px]'}
              handleChange={handleChange}
              placeholder={'Campaign Title'}
              maxLength={300}
              error={error}
              data={data}
            />
            <TextArea
              name="description"
              // label={'Campaign Description'}
              // labelClass={'!mb-[2px]'}
              handleChange={handleChange}
              placeholder={'Campaign Description'}
              maxLength={300}
              error={error}
              data={data}
            />
            {/* <Select
              defaultvalue={data.tokenName || ''}
              optionsList={creatorAddressList}
              handleChange={handleDropdown}
            /> */}
            <DatePicker
              selected={new Date(data.endingDate)}
              onChange={(date) =>
                setData({
                  ...data,
                  endingDate: date as Date,
                  endingDateStr: date?.toDateString() as string
                })
              }
              customInput={<CustomInput />}
            />
            <InputForm
              name="participant"
              // label={'No of Recipients'}
              // labelClass={'!mb-[2px]'}
              handleChange={handleChange}
              placeholder={'Number of Recipients'}
              maxLength={3}
              error={error}
              inputMode="numeric"
              data={data}
            />
            <InputForm
              name="totalAmount"
              handleChange={handleChange}
              // label={'Total Amount'}
              // labelClass={'!mb-[2px]'}
              placeholder={'Total funding amount'}
              maxLength={5}
              error={error}
              inputMode="numeric"
              data={data}
            />
            <TextArea
              type="text"
              rows={3}
              error={error}
              name="location"
              maxLength={225}
              data={data}
              handleChange={handleChange}
              className="placeholder-extrabold mt-1 block w-full rounded-[4px] border border-slate-300  bg-white p-4 placeholder-[#A3A3A3] shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Enter Campaign Location"
            />
            <div
              className={`bg-[#F9F9F9) flex h-[48px] w-full items-center justify-between rounded-[6px] border border-[#E4E4E7] px-[12px] text-base font-semibold ${
                !data.correctInfoCheck && 'opacity-40'
              }`}
            >
              <span>Total:</span>
              <span>
                {data.totalAmount || 0} Tokens for {data.participant || 0} Recipients
              </span>
            </div>
            <label className="block flex items-center">
              <input
                type="checkbox"
                name="correctInfoCheck"
                onChange={handleChange}
                // checked={data.correctInfoCheck}
                className="rounded-md border border-gray-300 bg-white p-2"
              />

              <span className="ml-[6px] text-base font-medium text-[#171717]">
                My merchant information is correct.
              </span>
            </label>
            <div onClick={handleSubmit}>
              <Button
                disabled={showLoader || !data.correctInfoCheck}
                showLoader={showLoader}
                text="Create"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CreateCampaignPage;






