'use client';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
// import { Popover } from '@headlessui/react';
import Button from 'components/botton';
import InputForm from 'components/form/input';
import TextArea from 'components/form/text-area';
// import PopupBox from 'components/popover';

import { useRouter } from 'next/navigation';
import { KeyboardEvent, useState } from 'react';
import { toast } from 'react-toastify';

import { useEnokiFlow } from '@mysten/enoki/react';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { ConfirmationScreen } from 'components/confirmationScreen';
import 'react-datepicker/dist/react-datepicker.css';
import {
  CAMPAIGN_PACKAGE_ID,
  LOCAL_COIN_APP,
  PACKAGE_ID,
  TOKEN_POLICY,
  USDC_TREASURY,
  USDC_TYPE
} from 'utils/constants';
import { APP_NETWORK, SUI_CLIENT } from 'utils/sui';

const CreateCampaignPage = () => {
  const router = useRouter();

  const flow = useEnokiFlow();
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
    if (Number(data.totalAmount) < 1) err.totalAmount = 'Min. funding amount should be 100';
    return err;
  };

  const createUserCampaign = async () => {
    try {
      const pkId = PACKAGE_ID;
      const tx = new TransactionBlock();

      tx.moveCall({
        target: `${pkId}::campaign_management::create_campaign`,
        arguments: [
          tx.pure.string(data.name?.trim()),
          tx.pure.string(data.description),
          tx.pure.u64(data.participant),
          tx.pure.string(data.location),

          tx.object(data.totalAmount),
          tx.object(LOCAL_COIN_APP),
          tx.object(USDC_TREASURY),
          tx.object(CAMPAIGN_PACKAGE_ID),
          tx.object(TOKEN_POLICY)
        ],
        typeArguments: [USDC_TYPE]
      });

      const result = await flow.sponsorAndExecuteTransactionBlock({
        network: APP_NETWORK,
        transactionBlock: tx,
        client: SUI_CLIENT
      });

      if (!result?.digest) {
        throw new Error('Failed creating campaign');
      }
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    try {
      const errorChecked = validation();
      setError(errorChecked);
      if (Object.keys(errorChecked).length === 0) {
        setShowLoader(true);
        const resp = await createUserCampaign();
        if (resp?.digest) {
          setShowLoader(false);
          console.log(resp);
          toast.success('Created a Campaign');
          // router.push('/campaign');
          setShowSuccess(true);
        }
      }
    } catch (error: any) {
      console.log(true);
      setShowLoader(false);
      toast.error('Failed creating campaign');
    }
  };
  // const handleDropdown = (value) => {
  //   console.log(value, ':val');
  //   setData({ ...data, tokenAddress: value.value, tokenName: value.name });
  // };


  const isDataNotFilled = () => {
    const isNotFilled =
      data.name === '' ||
      data.description === '' ||
      data.location === '' ||
      data.participant === '' ||
      data.totalAmount === '';
    return isNotFilled;
  };

  return (
    <section className="non-scrollable-section">
      {showSuccess ? (
        <ConfirmationScreen type="campaign" />
      ) : (
        <div className="container mx-auto">
          {/* <PageHeader backLink={`/campaign`} /> */}
          <div onClick={() => router.back()} className="my-[12px] flex cursor-pointer items-center">
            <ChevronLeftIcon width={16} height={16} />
            <span className="text-[12px] font-normal">Back</span>
          </div>

          <div className="">
            <div className="relative">
              <div>
                <h3 className="text-lg font-semibold">Start a Campaign</h3>
              </div>
            </div>
          </div>
          <div className="flex h-[calc(100vh_-_90px)] flex-col justify-between">
            <div className="grid gap-[4px] pb-[12px] pt-[12px]">
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
              {/* <div className='flex flex-col gap-[2px]'>
              <label className='text-base font-semibold text-[#171717]'>Ending date</label>
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
            </div> */}
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
                handleKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                  if (
                    (e.keyCode >= 65 && e.keyCode <= 90) ||
                    (e.keyCode >= 97 && e.keyCode <= 122)
                  ) {
                    e.preventDefault();
                  }
                }}
              />
              <InputForm
                name="totalAmount"
                handleChange={handleChange}
                // label={'Total Amount'}
                // labelClass={'!mb-[2px]'}
                placeholder={'USDC Object'}
                maxLength={70}
                error={error}
                // inputMode="numeric"
                data={data}
                // handleKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                //   if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122)) {
                //     e.preventDefault();
                //   }
                // }}
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
              {/* <div
              className={`bg-[#F9F9F9) flex h-[48px] w-full items-center justify-between rounded-[6px] border border-[#E4E4E7] px-[12px] text-base font-semibold ${
                !data.correctInfoCheck && 'opacity-40'
              }`}
            >
              <span>Total:</span>
              <span>
                {data.totalAmount || 0} Tokens for {data.participant || 0} Recipients
              </span>
            </div> */}

              <div>
                <input
                  checked={data.correctInfoCheck}
                  type="checkbox"
                  id={`correct-info-check`}
                  className="confirm-checkbox ticked-checkbox"
                  onChange={handleChange}
                  disabled={isDataNotFilled()}
                  name="correctInfoCheck"
                />
                <label
                  className={['confirm-checkbox-label', isDataNotFilled() ? 'opacity-40' : ''].join(
                    ' '
                  )}
                  htmlFor={`correct-info-check`}
                >
                  My campaign information is correct.
                </label>
              </div>
              {/* <label className="block flex items-center">
              <input
                type="checkbox"
                name="correctInfoCheck"
                onChange={handleChange}
                // checked={data.correctInfoCheck}
                className="rounded-md border border-gray-300 bg-white p-2"
                disabled={isDataNotFilled()}
              />

              <span className="ml-[6px] text-base font-medium text-[#171717]">
                My merchant information is correct.
              </span>
            </label> */}
            </div>
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
