'use client';
import { CurrencyDollarIcon, MapIcon, UserCircleIcon } from '@heroicons/react/16/solid';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import Button from 'components/botton';
import InputForm from 'components/form/input';
import { useCamapigns } from 'hooks/useCampaigns';
import { useMyContext } from 'hooks/useMyContext';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { campaignServices } from 'services/campaign-services';


interface IPaticipant {
  address?: string,
  name?: string,
  value?: boolean
}

const CampaignDetail = (props: any) => {
  const { userInfo } = useMyContext();
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(false);
  const [showUsernameBox, setShowUsernameBox] = useState(false);

  const [scanData, setScanData] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  // const [data, setData] = useState({
  //   username: ''
  // })
  const [error, setError] = useState<any>({});
  const [data, setData] = useState<any>({
    username: '',
    recipientAddress: userInfo?.publicKey
  });
  const pathname = usePathname();
  const { isDetailsFetching, campaignInfo } = useCamapigns({
    id: props.campaignId,
    fetchAllCampaign: true
  });
  console.log({ isDetailsFetching, campaignInfo });

  const [participantList, setParticipantList] = useState<any>([]);
  const [isCampaignAdmin, setisCampaignAdmin] = useState(false);
  const [acceptedNames, setAcceptedNames] = useState<string[]>([]);
  const [verifyLoader, setVerifyLoader] = useState(false);
  const [currentParticipant, setCurrentParticipant] = useState<IPaticipant>({});
  const [verifyConfirm, setVerifyConfirm] = useState(false);
  console.log(currentParticipant, ':cuurPart')

  useEffect(() => {
    if (userInfo.publicKey) {
      console.log({ userInfo });
      getCampaginOwner();
      fetchCampaignParticipate();
    }
  }, [userInfo]);

  const getCampaginOwner = async () => {
    await campaignServices
      .get_owner(userInfo.publicKey, props.campaignId)
      .then((ownerAdd) => {
        if (ownerAdd) {
          if (userInfo.publicKey === ownerAdd) {
            setisCampaignAdmin(true);
          }
        }
      })
      .catch((err) => console.log({ err }, 'from the gatecampaignOwner'));
  };

  console.log({ isCampaignAdmin });

  const fetchCampaignParticipate = async () => {
    await campaignServices
      .get_recipients_status({
        ...userInfo,
        campaignAddress: props.campaignId
      })
      .then((res: any) => {
        if (res.length) {
          setParticipantList(res);
          setCurrentParticipant(res?.find((part: any) => part.address === userInfo.publicKey))
        }
      })
      .catch((e) => console.log(e, 'from the pariticipant list'));
  };

  useEffect(() => {
    if (pathname.split('/')[1] === 'all-campaigns') {
      setNotLoggedIn(true);
    }
  }, []);
  // useEffect(() => {
  //   if (scanData) {
  //     const scanDatParse: any = JSON.parse(scanData);
  //     if (scanDatParse.publicKey) {
  //       setData({ ...data, recipientAddress: scanDatParse.publicKey });
  //     }
  //     buttonRef.current.close();
  //     setOpenDrawer(true);
  //   }
  // }, [scanData]);

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
  const joinCampaign = async () => {
    try {
      setShowLoader(true);
      const joinRes = await campaignServices.join_campaign(
        data.username,
        data.recipientAddress,
        userInfo,
        props.campaignId
      );

      console.log(joinRes, ':res');

      toast.success('Campaign Joined');
      setShowUsernameBox(false);
      fetchCampaignParticipate();
      setShowLoader(false);
    } catch (error) {
      console.log(error);
      setShowLoader(false);
    }
  };

  const handleJoin = async () => {
    if (!userInfo?.publicKey) {
      toast.error('Please login first');
      return;
    }
    setShowUsernameBox(true);

    // const res = await campaignServices.get_recipients_status(userInfo)
    // console.log(res, ':rec')
  };

  const handleCheckboxChange = (name: string, accepted: boolean) => {
    if(accepted) {
      setAcceptedNames(prevNames => [...prevNames, name])
    } else {
      setAcceptedNames(prevNames => prevNames.filter(n => n!== name))
    }
  }



  const handleVerify = async () => {

    try {
      setVerifyLoader(true)
      await campaignServices.verify_recipients(userInfo.secretKey, props.campaignId, acceptedNames);
      toast.success('Successfully verified participants')
      await fetchCampaignParticipate()
      setVerifyLoader(false)
      setVerifyConfirm(false)
    } catch (error) {
      console.log(error)
      setVerifyLoader(false)
    }
    
  };

  console.log(participantList, ':participant')

  return (
    <>
      {/* <Header className="h-[120px]">
        <div className="flex items-center">
          <p className="flex-1 text-2xl font-semibold text-center">Campaign Details</p>
        </div>
      </Header> */}

      <section className="relative">
        <div className="container mx-auto">
          {/* <PageHeader
            backLink={notLoggedIn ? '/all-campaigns' : '/campaign'}
            pageHeaderTitle={'Campaign Details'}
          /> */}

          {/* {(isDetailsFetching && !campaignInfo?.name && (
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
                      className="fixed bottom-7 right-7 md:absolute "
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
          )} */}

          <div onClick={() => router.back()} className="flex cursor-pointer items-center py-[18px]">
            <ChevronLeftIcon width={16} height={16} />
            <span className="text-[12px] font-normal">Back</span>
          </div>
          <div className="flex h-[90vh] flex-col justify-between">
            <div>
              <h3 className="text-base font-semibold">{campaignInfo?.name}</h3>
              <div className="my-[16px] relative w-full overflow-hidden rounded-[12px] border-[3px] border-solid border-[#D7D7D7]">
                <Image
                  src={'/storeImg.png'}
                  alt="Store"
                  height={420}
                  width={400}
                  className="w-full"
                />
                {currentParticipant && Object.keys(currentParticipant).length > 0 && (
                  currentParticipant?.value ? (
                    <div className='absolute'>
                      Verified
                    </div>
                  ) : (
                    <div className='absolute flex items-center bottom-[10px] right-[10px]  border border-[#fff] rounded-[6px] p-[2px] text-[#fff] text-xs font-normal'>
                      <span className='w-[10px] block h-[10px] rounded-[100%] bg-[#F24141] mr-[2px]'></span> Unverified
                    </div>
                  ) 

                )}
                
              </div>
              {/* <h2 className="text-2xl font-medium mb-[16px]">H & W Market</h2> */}
              <p className="text-base font-medium">{campaignInfo?.description}</p>

              <div className="mt-[16px] flex flex-col gap-[17px]">
                <div className="flex items-center gap-[6px]">
                  <UserCircleIcon width={20} height={20} />
                  <div className="flex items-center gap-[4px]">
                    <p className="text-base font-medium text-[#000]">
                      {campaignInfo?.no_of_recipients}/100
                    </p>
                    <span className="self-end text-[12px] font-normal italic text-[#A3A3A3]">
                      participants
                    </span>
                  </div>
                </div>
                {currentParticipant?.value || isCampaignAdmin && (
                  <div className="flex items-center gap-[6px]">
                    <CurrencyDollarIcon width={20} height={20} />
                    <div className="items-cente flex gap-[4px]">
                      <p className="text-base font-medium text-[#000]">2500</p>
                      <span className="self-end text-[12px]  font-normal italic text-[#A3A3A3]">
                        localcoin
                      </span>
                    </div>
                </div>

                )}
                {currentParticipant?.value || isCampaignAdmin && (
                  <div className="flex gap-[6px]">
                    <MapIcon width={20} height={20} />
                    <div className="flex items-center">
                      <p className="self-bottom text-base font-medium text-[#000]">
                        {campaignInfo?.location}
                      </p>
                      {/* <span className='text-[12px] font-normal italic text-[#A3A3A3]'>localcoin</span> */}
                    </div>
                  </div>
                )}
                
                
                {participantList?.length > 0 && isCampaignAdmin && (
                  <div className='w-[100%] mb-[20px]'>
                    <div className='flex justify-between w-[100%]'>
                      <div className='text-lg font-semibold'>Participants</div>
                      <div className='self-end flex items-center gap-[18px]'>
                        <div className='text-[10px] font-normal'>Status</div>
                        <div className='text-[10px] font-normal'>Accept</div>
                      </div>
                    </div>                      
                    {participantList.map((eachParticipant: any, eachIndex: number) => (
                      <div className='flex items-center justify-between' key={eachIndex + 1 + ''}>
                        <div className='flex items-center gap-[3px] text-base font-normal text-[#171717]'>
                          <span>{eachParticipant.name}{' '}</span>
                          {/* {eachParticipant.value ? (
                            <div title='Verified' className='verified-user'></div>
                          ) : (
                            <div title='Unverified' className='unverified-user'></div>
                          )} */}
                        </div>
                        <div className='flex items-center gap-[18px]'>
                          {/* <div className='w-[30px]'>
                              <input type="checkbox" id={`deny-${eachIndex + 1}`} className='verification-checkbox crossed-checkbox' />
                              <label className='verification-checkbox-label' htmlFor={`deny-${eachIndex + 1}`}></label>
                          </div> */}
                          {eachParticipant.value ? (
                            <div  className='text-xs font-normal'>verified</div>
                          ) : (
                            <div  className='text-xs font-normal'>unverified</div>
                          )}
                          <div className='w-[25px]'>
                              <input 
                                checked={acceptedNames.includes(eachParticipant.name) || eachParticipant?.value} 
                                type="checkbox" id={`accept-${eachIndex + 1}`} 
                                className='verification-checkbox ticked-checkbox'
                                onChange={(e) => handleCheckboxChange(eachParticipant.name, e.target.checked)} 
                                disabled={eachParticipant?.value}
                              />
                              <label className='verification-checkbox-label' htmlFor={`accept-${eachIndex + 1}`}></label>
                          </div>
                        </div>
                      </div>
                    ))}

                  </div>
                )}

              {participantList.length > 0 && isCampaignAdmin && (
                <div className='flex items-center justify-center'>
                  <button disabled={verifyLoader} className='border border-[#171717] rounded-[6px] text-base font-normal px-[12px] py-[4px] cursor-pointer' onClick={() => setVerifyConfirm(true)}>
                    {verifyLoader ? (
                      <svg
                        className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    ) : (
                      'Verify Participants'
                    )}
                    
                  </button>
                </div>
              )}
                
              </div>
            </div>
            
            <div>
              {isCampaignAdmin ? (
                <Button buttonType={'outlined'} text='End Campaign' />
              ): (
                <Button disabled={Boolean(currentParticipant)} handleClick={handleJoin} text="Join Campaign" />
              )}
              
            </div>
          </div>

          {showUsernameBox && (
            <div className="username-modal flex items-center justify-between">
              <div className="relative mx-auto flex h-[200px] w-[80%] items-center justify-center overflow-hidden rounded-[16px] bg-[#fff] p-[16px]">
                <span
                  onClick={() => setShowUsernameBox(false)}
                  className="absolute right-[4px] top-[4px] flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-[100%] border border-[#000]"
                >
                  X
                </span>
                <div className="flex flex-col gap-[20px] pl-[20px]">
                  <InputForm
                    name="username"
                    // label={'Title'}
                    // labelClass={'!mb-[2px]'}
                    handleChange={handleChange}
                    placeholder={'Enter Username'}
                    maxLength={300}
                    data={data}
                  />
                  <Button disabled={showLoader} showLoader={showLoader} handleClick={joinCampaign} text="Join" />
                </div>
              </div>
            </div>
          )}

          {verifyConfirm && (
            <div className="username-modal flex items-center justify-between">
              <div className="relative mx-auto flex h-[200px] w-[80%] items-center justify-center overflow-hidden rounded-[16px] bg-[#fff] p-[16px]">
                <span
                  onClick={() => setVerifyConfirm(false)}
                  className="absolute right-[4px] top-[4px] flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-[100%] border border-[#000]"
                >
                  X
                </span>
                <div className="flex flex-col gap-[20px] pl-[20px]">
                  <h3 className='text-lg font-extrabold text-center'>Are you sure you want to verify selected participants?</h3>
                  <Button disabled={verifyLoader} showLoader={verifyLoader} handleClick={handleVerify} text="Yes, Verify" />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CampaignDetail;
