'use client';
import { QrCodeIcon } from '@heroicons/react/24/outline';
import Button from 'components/botton';
import DetailCampaign from 'components/campaigncard/detail';
import Drawer from 'components/drawer';
import DrawerQRScan from 'components/drawer-qr-scan';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const CampaignDetail = (props: any) => {
  const [scanData, setScanData] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [error, setError] = useState<any>({});
  const [data, setData] = useState<any>({});

  useEffect(() => {
    if (scanData) {
      setOpenDrawer(true);
    }
  }, [scanData]);

  const campaignDetails: any = {
    id: 1,
    title: 'Nourish Every Soul',
    description:
      'Join us in our mission to provide hope and nourishment to those in need with our "Nourish Every Soul" campaign. Together, we aim to offer a warm and hearty dinner to homeless individuals for an entire month. Imagine the impact we can create by ensuring that no one goes to bed hungry, and every soul is embraced with the comfort of a wholesome meal.',
    owner: 'Conor Mcgregor',
    recipient: '13',
    tokentype: 'Token 1'
  };

  const buttonRef = useRef<any>(null);

  const handleChange = (e: any) => {
    delete error[e.target.name];
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validation = () => {
    const err: any = {};
    if (!data.amount) err.amount = 'Enter amount';
    if (!data.tokenType) err.tokenType = 'Enter Token Type';
    if (!data.recipientAddress) err.recipientAddress = 'Enter Recipient Address';

    return err;
  };

  const handleSubmit = () => {
    const err: any = validation();
    setError(err);
    if (Object.keys(err).length === 0) {
      setOpenDrawer(false);
      console.log('first');
    }
  };

  return (
    <>
      {/* <Header className="h-[120px]">
        <div className="flex items-center">
          <p className="flex-1 text-2xl font-semibold text-center">Campaign Details</p>
        </div>
      </Header> */}

      <section>
        <div className="container mx-auto">
          <Link href="/campaign">{'<- '}</Link>
          <div className="mb-6 ">
            <p className="text-heading">Campaign Detail </p>
            {/* <div className="w-12 h-12 bg-gray-600 rounded-full"></div> */}
          </div>
          {/* <div className="mb-6">
            <h2 className="mb-2 text-2xl font-bold">Campaign {props.campaignId}</h2>
          </div> */}

          <div className="grid grid-cols-1 gap-1">
            {/* <CampaignCard
              cardContainerClass="min-h-[50px] flex-col"
              campaignDetails={campaignDetails}
            /> */}

            <DetailCampaign campaignDetails={campaignDetails} />
            <div
              className="fixed bottom-7 right-7 "
              onClick={() => {
                setScanData('');
                buttonRef.current.open(Drawer);
              }}
            >
              <Link
                // href={asPath.includes('recipient') ? '/recipient/scan-pay' : '/merchant/scan-pay'}
                href=""
                className="flex w-fit items-center gap-2 rounded-full bg-blue-500 px-6 py-3"
              >
                <QrCodeIcon className="h-6 w-6 text-white" />
                <span className="text-base font-semibold text-white">Scan To Pay</span>
              </Link>
            </div>

            <DrawerQRScan ref={buttonRef} setScanData={setScanData} panelTitle="Scan QR Code" />

            <Drawer open={openDrawer} setOpen={setOpenDrawer} panelTitle="Send Token">
              <label className="block">
                <input
                  type="text"
                  onChange={handleChange}
                  name="recipientAddress"
                  maxLength={300}
                  value={data.recipientAddress || ''}
                  className="mt-1 block w-full rounded-[4px] border border-slate-300 bg-white  p-4 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  placeholder=" Token Amount"
                />
                <p className={` mt-2 text-xs text-pink-600 peer-invalid:visible`}>
                  {error.recipientAddress || ''}
                </p>
              </label>
              <label className="block">
                <input
                  type="text"
                  onChange={handleChange}
                  name="tokenType"
                  maxLength={300}
                  value={data.tokenType || ''}
                  className="mt-1 block w-full rounded-[4px] border border-slate-300 bg-white  p-4 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  placeholder=" Token Amount"
                />
                <p className={` mt-2 text-xs text-pink-600 peer-invalid:visible`}>
                  {error.tokenType || ''}
                </p>
              </label>
              <label className="block">
                <input
                  type="number"
                  inputMode="numeric"
                  onChange={handleChange}
                  name="amount"
                  maxLength={300}
                  value={data.amount || ''}
                  className="mt-1 block w-full rounded-[4px] border border-slate-300 bg-white  p-4 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  placeholder=" Token Amount"
                />
                <p className={` mt-2 text-xs text-pink-600 peer-invalid:visible`}>
                  {error.amount || ''}
                </p>
              </label>
              <div
                className="mt-6"
                onClick={() => {
                  handleSubmit();
                }}
              >
                <Button text="Pay Now" />
              </div>
            </Drawer>
          </div>
        </div>
      </section>
    </>
  );
};

export default CampaignDetail;
