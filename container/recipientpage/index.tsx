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
  const [showLoader, setShowLoader] = useState(false);
  const [submitForm, setSubmitForm] = useState(false);
  const { isFetching, tokenList } = useRecipient({ data, sendTokenToMer: submitForm });
  const [isGoodToGo, setisGoodToGo] = useState(false);

  useEffect(() => {
    if (scanData) {
      const scannedData = JSON.parse(scanData);
      setData({ ...data, merchantAddress: scannedData?.publicKey });
      setOpenDrawer(true);
    }
  }, [scanData]);

  useEffect(() => {
    if (tokenList?.length) {
      setData({ ...data, tokenName: tokenList[0]?.name });
    }
  }, [tokenList]);

  const { merchant_info, isGettingInfo, merchant_associated } = useMerchant({
    merchantAddress: data?.merchantAddress
  });
  console.log({ merchant_info, merchant_associated, data });
  useEffect(() => {
    if (merchant_info && Object.keys(merchant_info)?.length > 0) {
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
  }, [merchant_info]);

  const handleSubmit = () => {
    setSubmitForm(true);
  };
  const handleChange = (e: any) => {
    const {
      target: { name, value }
    } = e;
    setData({ ...data, [name]: value });
  };
  const handleDropdown = (value: any) => {
    console.log({ value });
    setData({ ...data, creatorAddress: value.value || value, tokenName: value.name || value });
  };
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
            {isGettingInfo && <div className="">Skeleton . . . . </div>}
            <div className="flex w-full flex-nowrap justify-between gap-4 ">
              <div className="block w-full shrink-0">
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
              </div>

              <div className="block w-full shrink-0">
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
                <InputForm
                  label={'Amount'}
                  type="text"
                  data={data}
                  error={error}
                  maxLength={300}
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
            </div>

            <div
              className="mt-6"
              onClick={() => {
                handleSubmit();
              }}
            >
              <Button text="Pay Now" disabled={showLoader} showLoader={isFetching} />
            </div>
          </Drawer>
        </div>
      </section>
    </>
  );
};

export default RecipientPage;
