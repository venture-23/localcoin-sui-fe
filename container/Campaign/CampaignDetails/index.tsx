'use client';
import { QrCodeIcon } from '@heroicons/react/24/outline';
import Button from 'components/botton';
import DetailCampaign from 'components/campaigncard/detail';
import Drawer from 'components/drawer';
import DrawerQRScan from 'components/drawer-qr-scan';
import InputForm from 'components/form/input';
import PageHeader from 'components/pageheader';
import CampaignDetailSkeleton from 'components/skeleton/campagin-details';
import { useCamapigns } from 'hooks/useCampaigns';
import { useMyContext } from 'hooks/useMyContext';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { campaignServices } from 'services/campaign-services';
const CampaignDetail = (props: any) => {
  const { userInfo } = useMyContext();
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(false);

  const [scanData, setScanData] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [error, setError] = useState<any>({});
  const [data, setData] = useState<any>({
    // recipientAddress: 'GAFD2TMWS75B5VHQTUQ3E534UEHNLRIHH64VYO4EAMYNEIDXJ765JI34',
    // amount: 1
  });
  const pathname = usePathname();
  const { isDetailsFetching, campaignInfo } = useCamapigns({ id: props.campaignId });
  console.log({ isDetailsFetching, campaignInfo });
  useEffect(() => {
    if (pathname.split('/')[1] === 'all-campaigns') {
      setNotLoggedIn(true);
    }
  }, []);
  useEffect(() => {
    if (scanData) {
      const scanDatParse: any = JSON.parse(scanData);
      if (scanDatParse.publicKey) {
        setData({ ...data, recipientAddress: scanDatParse.publicKey });
      }
      buttonRef.current.close();
      setOpenDrawer(true);
    }
  }, [scanData]);

  const buttonRef = useRef<any>(null);

  const handleChange = (e: any) => {
    delete error[e.target.name];
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validation = () => {
    const err: any = {};
    if (!data.amount) err.amount = 'Enter amount';
    if (!data.recipientAddress) err.recipientAddress = 'Enter Recipient Address';

    return err;
  };

  const handleSubmit = async () => {
    const err: any = validation();
    setError(err);
    if (Object.keys(err).length === 0) {
      setShowLoader(true);
      campaignServices
        .transfer_tokens_to_recipient(
          userInfo.secretKey,
          data.recipientAddress,
          parseFloat(data.amount),
          props.campaignId
        )
        .then((z) => {
          if (z._value === undefined) {
            setOpenDrawer(false);
            setShowLoader(false);
            toast.success('Token Sent !!!');
            router.push('/campaign');
          }
        })
        .catch((e) => {
          setShowLoader(false);
          toast.error('Error on Token Transfer');
        });
      // console.log('first');
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
          <PageHeader
            backLink={notLoggedIn ? '/all-campaigns' : '/campaign'}
            pageHeaderTitle={'Campaign Detail'}
          />

          {(isDetailsFetching && !campaignInfo?.name && (
            <>
              <CampaignDetailSkeleton />
            </>
          )) || (
            <>
              <div className="grid grid-cols-1 gap-1">
                <DetailCampaign campaignDetails={campaignInfo} />
                {!notLoggedIn && (
                  <>
                    <div
                      className="fixed bottom-7 right-7 "
                      onClick={() => {
                        setScanData('');
                        buttonRef.current.open(Drawer);
                        // setOpenDrawer(true);
                      }}
                    >
                      <Link
                        href=""
                        className="flex w-fit items-center gap-2 rounded-full bg-blue-500 px-6 py-3"
                      >
                        <QrCodeIcon className="h-6 w-6 text-white" />
                        <span className="text-base font-semibold text-white">Scan To Pay</span>
                      </Link>
                    </div>

                    <DrawerQRScan
                      ref={buttonRef}
                      setScanData={setScanData}
                      panelTitle="Scan QR Code"
                    />

                    <Drawer open={openDrawer} setOpen={setOpenDrawer} panelTitle="Send Token">
                      <label className="block">
                        <InputForm
                          type="text"
                          data={data}
                          error={error}
                          maxLength={300}
                          name="recipientAddress"
                          handleChange={handleChange}
                          placeholder="Recipient Address"
                        />
                        <InputForm
                          type="text"
                          data={data}
                          error={error}
                          maxLength={300}
                          name="amount"
                          handleChange={handleChange}
                          placeholder="Amount"
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
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default CampaignDetail;
