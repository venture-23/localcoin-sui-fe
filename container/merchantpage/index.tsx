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
import { shareOnMobile } from 'react-mobile-share';
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
  const validBase64 = (url: string) => {
    return 'data:image/jpeg;base64,' + url.split(',')[1];
  };
  const handleShare = async () => {
    // const imgBase64 = validBase64(imageUrl);
    const imgBase64 =
      'data:image/jpeg;base64,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';
    shareOnMobile({
      text: 'Scan QR code to make payment',
      url: imageUrl,
      title: 'Scan to Pay',
      images: [imgBase64]
    });
  };
  const downloadBase64File = async (fileName: string) => {
    const imgBase64 = imageUrl;
    const linkSource = `${imgBase64}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
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
              handleClick={() => downloadBase64File('ScanToPay')}
              buttonIcon={<ArrowDownOnSquareStackIcon width={24} height={24} />}
              text="Save image"
            />
          </a>
          <Button
            handleClick={() => {
              const imgBase64 = validBase64(imageUrl);

              shareOnMobile(
                {
                  text: 'Scan to make payment',
                  url: 'https://localcoin-mobileapp.vercel.app/merchant',
                  title: 'Scan to Pay',
                  images: [imgBase64]
                },
                (message) => alert(message)
              );
            }}
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
