'use client';
import { ViewfinderCircleIcon } from '@heroicons/react/24/outline';
import RecipientCarousel from 'components/RecipientCarousel';
import Button from 'components/botton';
import Card from 'components/card';
import Drawer from 'components/drawer';
import DrawerQrScan from 'components/drawer-qr-scan';
import InputForm from 'components/form/input';
import RecipientFunded from 'components/icons/recipient-funded';
import RecipientOngoing from 'components/icons/recipient-ongoing';
import RecipientToken from 'components/icons/recipient-token';
import { useMerchant } from 'hooks/useMerchant';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// Import Swiper React components

const RecipientPage = () => {
  const buttonRef = useRef<any>(null);
  const [scanData, setScanData] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [data, setData] = useState<any>({});
  const [error, setError] = useState({});
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (scanData) {
      const scannedData = JSON.parse(scanData);
      setData({ ...data, merchantAddress: scannedData?.publicKey });
      setOpenDrawer(true);
    }
  }, [scanData]);

  const { merchant_info, isGettingInfo, merchant_associated } = useMerchant({
    merchantAddress: data?.merchantAddress
  });

  console.log({ merchant_info, isGettingInfo, merchant_associated });

  useEffect(() => {
    if (merchant_info && Object.keys(merchant_info)?.length > 0) {
      setData({ ...data, ...merchant_info });
    }
  }, [merchant_info]);

  const handleSubmit = () => {};
  const handleChange = () => {};
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
          {/* <div
            className=" mb-6 w-full max-w-[208px]  rounded-lg p-5 text-white"
            style={{
              background: 'linear-gradient(180deg, #1384F5 0%, #4EABFE 100%)'
            }}
          >
            <div className="flex flex-col items-center justify-center ">
              <div>
                <HeartIcon width={64} height={64} />
              </div>
              <p className="text-lg font-semibold"> Health</p>
            </div>
            <div className="flex items-center justify-between mt-4 ">
              <p className="font-normal">Balance</p>
              <div className="flex items-center gap-1 ">
                <Image alt="coin" src="/coin.png" width={16} height={16} /> <p>120</p>
              </div>
            </div>
          </div> */}

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

            <div className="fixed bottom-0 left-0 w-full">
              <DrawerQrScan
                shareQr={false}
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
            }}
            panelTitle="Send Token"
          >
            {isGettingInfo && <>Skeleton . . . . </>}
            <label className="block">
              <InputForm
                label={'Store Name'}
                type="text"
                readOnly
                data={data}
                error={error}
                maxLength={300}
                name="store_name"
                handleChange={handleChange}
                placeholder="Store Name"
              />
              <InputForm
                label={'Proprietary Name'}
                type="text"
                data={data}
                readOnly
                error={error}
                maxLength={300}
                name="proprietor"
                handleChange={handleChange}
                placeholder="Recipient Address"
              />
              <InputForm
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
              />

              <InputForm
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
            </label>

            <div
              className="mt-6"
              onClick={() => {
                handleSubmit();
              }}
            >
              <Button text="Pay Now" disabled={showLoader} showLoader={showLoader} />
            </div>
          </Drawer>
        </div>
      </section>
    </>
  );
};

export default RecipientPage;
