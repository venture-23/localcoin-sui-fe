'use client';

import { Tab } from '@headlessui/react';
import { ArrowDownOnSquareStackIcon, QrCodeIcon, ShareIcon } from '@heroicons/react/24/outline';
import Button from 'components/botton';
import Drawer from 'components/drawer';
import PopupBox from 'components/popover';
import CampaignListSkeleton from 'components/skeleton/campaign-list';
import TokenCard from 'components/tokencard';
import { useMerchant } from 'hooks/useMerchant';
import { useMyContext } from 'hooks/useMyContext';
import { useRecipient } from 'hooks/useReceipient';
import Link from 'next/link';
import QRCode from 'qrcode';
import { useEffect, useRef, useState } from 'react';

const MerchantPage = () => {
  const [active, setActive] = useState(1);
  const [open, setOpen] = useState(false);

  const [imageUrl, setImageUrl] = useState('');
  const popOverRef = useRef<any>(null);
  const { userInfo } = useMyContext();
  const [error, setError] = useState<any>({});
  const [data, setData] = useState<any>({ amount: '' });
  const { isFetching, tokenList } = useRecipient({});
  // const { isProcessing, merchantResponse } = useMerchant();
  // console.log({ isFetching, tokenList, isProcessing, merchantResponse });
  useEffect(() => {
    generateQrCode();
  }, []);
  const generateQrCode = async () => {
    try {
      const staticData = {
        type: 'merchant',
        publicKey: userInfo.publicKey,
        amount: data.amount || 0,
        proprietaryName: userInfo.proprietaryName,
        phoneNumber: userInfo.phoneNumber,
        storeName: userInfo.storeName,
        location: userInfo.location
      };
      const response = await QRCode.toDataURL(JSON.stringify(staticData));
      setImageUrl(response);
    } catch (error) {
      // debugger;
      console.log(error);
    }
  };
  const handleChange = (e: any) => {
    delete error[e.target.name];
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const proceedQr = () => {
    const err: any = validation();
    if (!err.amount) {
      setOpen(false);
      // setIsOpenPopup(true);
      popOverRef.current.open({ title: 'Share QR Code', imageUrl });
    } else {
      setError(err);
    }
  };

  const validation = () => {
    const err: any = {};
    if (!data.amount) err.amount = 'Enter amount';

    return err;
  };
  const [verifyMerchant, setVerifyMerchant] = useState(false);
  useMerchant({ verify_merchant: verifyMerchant });
  return (
    <>
      {/* <Header className="h-[120px]">
        <div className="flex items-center">
        </div>
      </Header> */}
      {/* <Link href="/"><ArrowLeftIcon width={24} height={24} /></Link> */}

      <section>
        <div className="container mx-auto">
          {/* tabs */}

          <div className="mb-6 flex items-center justify-between pt-10 ">
            <p onClick={() => setVerifyMerchant(true)} className="text-heading">
              Merchant Profile
            </p>
            <div className="h-12 w-12 rounded-full bg-gray-600"></div>
          </div>
          <div className="">
            <Tab.Group>
              <div className="w-full max-w-xs">
                <Tab.List className="flex space-x-1 bg-transparent">
                  <Tab
                    onClick={() => setActive(1)}
                    className={`w-full rounded-[4px]  py-3 text-lg font-semibold leading-5 !outline-none !outline-0 !ring-0 !ring-offset-0
       
      ${active === 1 ? 'bg-primary text-white shadow' : 'text-color '}`}
                  >
                    Your Tokens
                  </Tab>

                  <Tab
                    onClick={() => setActive(2)}
                    className={`r w-full rounded-[4px]  py-3 text-lg font-semibold !outline-none !outline-0 !ring-0 !ring-offset-0
      ${active === 2 ? 'bg-primary text-white shadow' : 'text-color '}`}
                  >
                    Settlements
                  </Tab>
                </Tab.List>
              </div>
              <Tab.Panels className="mt-6 h-[90vh]">
                <Tab.Panel
                  className={`
                     `}
                >
                  {tokenList?.map((eachToken: any, eachInd: number) => (
                    <TokenCard
                      key={eachInd + 1 + ''}
                      cardContainerClass=" justify-between"
                      tokenDetails={eachToken}
                    />
                  ))}
                  {isFetching && <CampaignListSkeleton defaultData={2} />}
                </Tab.Panel>

                <Tab.Panel
                  className={`
                     `}
                >
                  <div className="grid gap-2">
                    <Button
                      text="Request for Settlement"
                      underline={`  bg-white border border-gray-200 !text-[#212B34]  font-semibold `}
                    />
                    <Button
                      text="Finish Settlement"
                      underline={`  bg-white border border-gray-200 !text-[#212B34]  font-semibold `}
                    />
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>

        <div className="fixed bottom-7 right-7 " onClick={() => setOpen(true)}>
          <Link
            // href={asPath.includes('recipient') ? '/recipient/scan-pay' : '/merchant/scan-pay'}
            href=""
            className="flex w-fit items-center gap-2 rounded-full bg-blue-500 px-6 py-3"
          >
            <QrCodeIcon className="h-6 w-6 text-white" />
            <span className="text-base font-semibold text-white">Request to Pay</span>
          </Link>
        </div>

        <Drawer open={open} setOpen={() => proceedQr()} panelTitle="Share QR Code">
          <label className="block">
            <span className="text-color block text-sm font-medium after:ml-0.5 after:text-red-500 ">
              Token Amount
            </span>
            <input
              type="text"
              onChange={(e) => handleChange(e)}
              name="amount"
              maxLength={300}
              value={data.amount}
              className="mt-1 block w-full rounded-[4px] border border-slate-300 bg-white  p-4 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder=" Token Amount"
            />
            <p className={` mt-2 text-xs text-pink-600 peer-invalid:visible`}>{error.amount}</p>
          </label>
          <div
            className="mt-6"
            onClick={() => {
              proceedQr();
            }}
          >
            <Button text="Share QR Code" />
          </div>
        </Drawer>
        <PopupBox ref={popOverRef}>
          <a href={imageUrl} download className="w-full">
            <Button
              buttonIcon={<ArrowDownOnSquareStackIcon width={24} height={24} />}
              text="Save image"
            />
          </a>
          <Button
            text="Share"
            buttonType="secondary"
            buttonIcon={<ShareIcon width={24} height={24} />}
          />
        </PopupBox>
        {/* <Popover
          PopupTitle="Share QR Code"
          setIsOpenPopup={setIsOpenPopup}
          isOpenPopup={isOpenPopup}
          imageUrl={imageUrl}
        >
          <a href={imageUrl} download className="w-full">
            <Button
              buttonIcon={<ArrowDownOnSquareStackIcon width={24} height={24} />}
              text="Save image"
            />
          </a>
          <Button
            text="Share"
            buttonType="secondary"
            buttonIcon={<ShareIcon width={24} height={24} />}
          />
        </Popover> */}
      </section>
    </>
  );
};

export default MerchantPage;
