'use client';
import { ViewfinderCircleIcon } from '@heroicons/react/24/outline';
import RecipientCarousel from 'components/RecipientCarousel';
import Button from 'components/botton';
import Card from 'components/card';
import Drawer from 'components/drawer';
import DrawerQrScan from 'components/drawer-qr-scan';
import InputForm from 'components/form/input';
import Select from 'components/form/select';
import RecipientFunded from 'components/icons/recipient-funded';
import RecipientOngoing from 'components/icons/recipient-ongoing';
import RecipientToken from 'components/icons/recipient-token';
import { useMerchant } from 'hooks/useMerchant';
import { useRecipient } from 'hooks/useReceipient';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

// Import Swiper React components

const RecipientPage = () => {
  const buttonRef = useRef<any>(null);
  const [scanData, setScanData] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [data, setData] = useState<any>({});
  const [error, setError] = useState({});

  const [isGoodToGo, setisGoodToGo] = useState(false);

  const { merchant_info, isGettingInfo, merchant_associated, setFetch_merchant_info } = useMerchant(
    {
      merchantAddress: data?.merchantAddress,
      tokenId: data?.tokenAddress,
      data
    }
  );
  const { isFetching, sendTokenToMerchant, tokenList, isSendToMerchantSucc } = useRecipient({
    data
  });

  useEffect(() => {
    if (isSendToMerchantSucc) {
      setOpenDrawer(false);
      setScanData('');
      setData({});
    }
  }, [isSendToMerchantSucc]);

  useEffect(() => {
    if (scanData) {
      const scannedData = JSON.parse(scanData);
      if (scannedData?.publicKey) {
        console.log({ publicKey: scannedData?.publicKey });
        setFetch_merchant_info(true);
        setData({ ...data, merchantAddress: scannedData?.publicKey });
        setOpenDrawer(true);
      } else {
        toast.error('Invalid QR');
      }
    }
  }, [scanData]);

  useEffect(() => {
    if (tokenList?.length) {
      console.log({ tokenList });
      setData({
        ...data,
        tokenName: tokenList[0]?.name,
        tokenAddress: tokenList[0]?.contractToken
      });
    }
  }, [tokenList]);

  // console.log({ merchant_info, merchant_associated, data });
  useEffect(() => {
    if (merchant_info && Object.keys(merchant_info)?.length > 0 && merchant_associated) {
      if (merchant_associated?.length) {
        if (merchant_associated.includes(data.merchantAddress)) {
          setisGoodToGo(true);
          console.log(merchant_associated.includes(data.merchantAddress));
        } else {
          toast.error(
            `You can't transfer to the scan Merchant, Choose Another one token or Scan another Merchant`,
            {
              autoClose: 5000,
              pauseOnHover: true
            }
          );
        }
      } else {
        toast.error(`You can't transfer to the scan Merchant`);
      }
      setData({ ...data, ...merchant_info, merchant_associated });
    }
  }, [merchant_info, merchant_associated]);

  const handleSubmit = () => {
    console.log('presseed');
    sendTokenToMerchant();
  };
  const handleChange = (e: any) => {
    const {
      target: { name, value }
    } = e;
    setData({ ...data, [name]: value });
  };
  const handleDropdown = (value: any) => {
    console.log({ value });
    setData({ ...data, tokenAddress: value.value || value, tokenName: value.name || value });
  };
  console.log(isGoodToGo, !!data.amount);
  return (
    <>
      <section className="">
        <div className="container mx-auto">
          <div className="mb-6 flex items-center justify-between pt-10 ">
            <p className="text-heading">Recipient Profile</p>
            <Image
              src={`/avatar.webp`}
              width={48}
              height={48}
              alt="Profile Image"
              className="!h-12 !w-12 rounded-full  object-cover"
            />
          </div>
          <RecipientCarousel />
          <div className="mb-6 ">
            <div className="grid gap-3 ">
              {/* <TokenCard cardContainerClass=" justify-between" tokenDetails={tokenDetails} /> */}
              <div className="grid gap-5">
                <Card title="Your Tokens" link="/recipient/tokens" iconName={<RecipientToken />} />
                <Card
                  title="Ongoing Campaigns"
                  link="/recipient/campaigns"
                  iconName={<RecipientOngoing />}
                />
                <Card title="Funded Campaigns" link="/" iconName={<RecipientFunded />} />
              </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full [@media(min-width:1024px)]:left-1/2 [@media(min-width:1024px)]:max-w-[375px] [@media(min-width:1024px)]:-translate-x-1/2">
              <DrawerQrScan
                shareQr={true}
                ref={buttonRef}
                setScanData={setScanData}
                panelTitle="Scan QR Code"
              />
              <Button
                handleClick={() => {
                  setScanData('');
                  buttonRef.current.open();
                }}
                text="scan to pay"
                underline="rounded-none capitalize py-5"
                buttonIcon={<ViewfinderCircleIcon width={24} height={24} />}
              />
            </div>
          </div>
          <Drawer
            open={openDrawer}
            setOpen={() => {
              setOpenDrawer(false);
              setScanData('');
              setData({});
              setFetch_merchant_info(false);
            }}
            panelTitle="Send Token"
          >
            {isGettingInfo && <div className="">Skeleton . . . . </div>}
            <div>
              <p className="m-0 mb-3 font-semibold">Receiver Detail</p>
              <div className="mb-4 rounded-md bg-gray-50 p-4">
                <div className="grid grid-cols-2 gap-y-2">
                  <InputForm
                    label={'Store Name'}
                    labelClass={`text-sm font-semibold`}
                    type="text"
                    readOnly
                    data={data}
                    error={error}
                    maxLength={300}
                    name="store_name"
                    handleChange={handleChange}
                    placeholder="Store Name"
                    inputCSS={`pointer-events-none border-none !bg-transparent !p-0 !shadow-none truncate hover:text-clip focus-within:text-clip`}
                  />

                  <InputForm
                    label={'Proprietary Name'}
                    labelClass={`text-sm font-semibold`}
                    type="text"
                    data={data}
                    readOnly
                    error={error}
                    maxLength={300}
                    name="proprietor"
                    handleChange={handleChange}
                    placeholder="Proprietary Name "
                    inputCSS={`pointer-events-none border-none !bg-transparent !p-0 !shadow-none truncate hover:text-clip focus-within:text-clip`}
                  />

                  <InputForm
                    labelClass={`text-sm font-semibold`}
                    inputCSS={`pointer-events-none border-none !bg-transparent !p-0 !shadow-none truncate hover:text-clip focus-within:text-clip`}
                    label={'Phone Number'}
                    type="text"
                    readOnly
                    data={data}
                    error={error}
                    maxLength={300}
                    name="phone_no"
                    handleChange={handleChange}
                    placeholder="Phone Number"
                  />

                  <InputForm
                    label={'Location'}
                    type="text"
                    data={data}
                    readOnly
                    error={error}
                    maxLength={300}
                    name="location"
                    handleChange={handleChange}
                    placeholder="Location"
                    inputCSS={`pointer-events-none border-none !bg-transparent !p-0 !shadow-none truncate hover:text-clip focus-within:text-clip`}
                    labelClass={`text-sm font-semibold`}
                  />

                  <div className="col-span-2">
                    <InputForm
                      labelClass={`text-sm font-semibold`}
                      inputCSS={`pointer-events-none border-none !bg-transparent !p-0 !shadow-none truncate hover:text-clip focus-within:text-clip col-span-2`}
                      label={'Merchant Address'}
                      type="text"
                      data={data}
                      readOnly
                      error={error}
                      maxLength={300}
                      name="merchantAddress"
                      handleChange={handleChange}
                      placeholder="Merchant Address"
                    />
                  </div>
                </div>
              </div>

              <InputForm
                inputMode={'numeric'}
                label={'Amount'}
                type="text"
                data={data}
                error={error}
                maxLength={3}
                name="amount"
                handleChange={handleChange}
                placeholder="Amount"
              />
              <Select
                optionsList={tokenList}
                handleChange={handleDropdown}
                defaultvalue={data.tokenName || ''}
              />
            </div>
            {console.log({ isFetching })}
            <Button
              text="Pay Now"
              showLoader={isFetching}
              handleClick={handleSubmit}
              disabled={!data.amount || isFetching}
            />
          </Drawer>
        </div>
      </section>
    </>
  );
};

export default RecipientPage;
