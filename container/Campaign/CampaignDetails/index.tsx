'use client';
import { MapIcon, UserCircleIcon } from '@heroicons/react/16/solid';
import { ChevronLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEnokiFlow } from '@mysten/enoki/react';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { useWallet } from '@suiet/wallet-kit';
import Button from 'components/botton';
import InputForm from 'components/form/input';
import CampaignDetailSkeleton from 'components/skeleton/campagin-details';
import { useLogin } from 'hooks';
import { useCamapigns } from 'hooks/useCampaigns';
import { useMyContext } from 'hooks/useMyContext';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import QRCode from 'qrcode';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { campaignServices } from 'services/campaign-services';
import { maskWalletAddress } from 'utils/clipper';
import { CAMPAIGN_PACKAGE_ID, LOCAL_COIN_APP, PACKAGE_ID, TOKEN_POLICY } from 'utils/constants';
import { APP_NETWORK, SUI_CLIENT } from 'utils/sui';


interface IPaticipant {
  address?: string,
  name?: string,
  value?: boolean
}

const CampaignDetail = (props: any) => {
  const { userDetails } = useLogin()
  const { userInfo } = useMyContext();
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(false);
  const [showUsernameBox, setShowUsernameBox] = useState(false);
  const flow = useEnokiFlow()

  const [scanData, setScanData] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  // const [data, setData] = useState({
  //   username: ''
  // })
  const joinedCInfo = JSON.parse(localStorage.getItem('joinedCampaignInfo') || '{}')
  const [error, setError] = useState<any>({});
  const [data, setData] = useState<any>({
    username: '',
    recipientAddress: userDetails?.address
  });
  const pathname = usePathname();
  const { isDetailsFetching, campaignInfo } = useCamapigns({
    id: props.campaignId,
    fetchAllCampaign: true
  });
  console.log({ isDetailsFetching, campaignInfo }, ':campaignInfoDetails');

  const [participantList, setParticipantList] = useState<any>([]);
  const [isCampaignAdmin, setisCampaignAdmin] = useState(false);
  const [acceptedNames, setAcceptedNames] = useState<string[]>([]);
  const [verifyLoader, setVerifyLoader] = useState(false);
  const [currentParticipant, setCurrentParticipant] = useState<IPaticipant>({});
  const [verifyConfirm, setVerifyConfirm] = useState(false);
  const [endCampaignConfirm, setEndCampaignConfirm] = useState(false);
  const [requestedIncentive, setRequestedIncentive] = useState(false);
  const [participantPaymentReceived, setParticipantPaymentReceived] = useState(false);
  const [loader, setLoader] = useState(false);
  

  const { signAndExecuteTransactionBlock } = useWallet()
  

  const [isCampaignEnded, setIsCampaignEnded] = useState(false);
  console.log(currentParticipant, ':cuurPart')

  useEffect(() => {
    if (userDetails?.address) {
      console.log({ userInfo });
      getCampaginOwner();
      fetchCampaignParticipate();
      // getCampaignStatus()
    }

    return () => {
      setCurrentParticipant({})
      setIsCampaignEnded(false);
      setisCampaignAdmin(false);
      
    }
  }, [userInfo]);

  const getCampaignStatus = async() => {
    try {
      setLoader(true);
      // const isEnded = await campaignServices.is_ended(userInfo, props.campaignId)
      // setIsCampaignEnded(isEnded?._value)
      setIsCampaignEnded(false)
      setLoader(false)
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
    
  }

  const getCampaginOwner = async () => {
    const isOwner = campaignInfo?.creator === userDetails?.address
    setisCampaignAdmin(isOwner);

  };

  // console.log({ isCampaignAdmin });

  const fetchCampaignParticipate = async () => {
    console.log('fetching recipients')
    try {
      const res = await campaignServices.get_recipients_status(userDetails?.address, props.campaignId)
      if(res.length > 0) {
        const sortedParticipant = res.sort((a: any, b: any) => (b?.value === true) - (a?.value === true))

        setParticipantList(sortedParticipant);
        
        setCurrentParticipant(res?.find((part: any) => part.address === userDetails?.address))
      }
      setLoader(false)
    } catch (error) {
      console.log(error, 'from the pariticipant list')
      setLoader(false)
    }
  };

  // useEffect(() => {
  //   if (pathname.split('/')[1] === 'all-campaigns') {
  //     setNotLoggedIn(true);
  //   }
  // }, []);
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

  // const handleSubmit = async () => {
  //   const err: any = validation();
  //   setError(err);
  //   if (Object.keys(err).length === 0) {
  //     setShowLoader(true);
  //     campaignServices
  //       .transfer_tokens_to_recipient(
  //         userInfo.secretKey,
  //         data.recipientAddress,
  //         parseFloat(data.amount),
  //         props.campaignId
  //       )
  //       .then((z) => {
  //         if (z._value === undefined) {
  //           setOpenDrawer(false);
  //           setShowLoader(false);
  //           toast.success('Token Sent !!!');
  //           router.push('/campaign');
  //         }
  //       })
  //       .catch((e) => {
  //         setShowLoader(false);
  //         toast.error('Error on Token Transfer');
  //       });
  //     // console.log('first');
  //   }
  // };
  const joinCampaign = async () => {
    try {
      setShowLoader(true);
      const pkId = PACKAGE_ID
      const tx = new TransactionBlock()
      tx.moveCall({
        target: `${pkId}::campaign_management::join_campaign`,
        arguments: [
            
            tx.object(CAMPAIGN_PACKAGE_ID),
            tx.pure.string(campaignInfo?.name),
            tx.pure.string(data.username)
        ],

      })

      const result = await flow.sponsorAndExecuteTransactionBlock({
        network: APP_NETWORK,
        transactionBlock: tx,
        client: SUI_CLIENT
      });

      // const result = await signAndExecuteTransactionBlock({
      //   transactionBlock: tx
      // })

      if(!result?.digest) throw new Error("Failed joining campaign")
      
        const prevJoinedCamp = localStorage.getItem('joinedCampaignInfo') || '';
        console.log(prevJoinedCamp)
        const joinedInfo = []
        if(prevJoinedCamp !== '') {
          for(const prev of JSON.parse(prevJoinedCamp)) {
            console.log(prev, ':prev')
            joinedInfo.push(prev);
          }
        } 
        joinedInfo.push({ campaignAddress: props.campaignId, username: data.username })
     
  
        if (typeof window !== 'undefined') {
          console.log(joinedInfo, ':Joined')
          localStorage.setItem('joinedCampaignInfo', JSON.stringify(joinedInfo));
        }
        
  
        toast.success('Campaign Joined Successfully');
        setShowUsernameBox(false);
        fetchCampaignParticipate();


      setShowLoader(false)
    } catch (error) {
      console.log(error);
      toast.error('Failed Joining Campaign')
      setShowLoader(false);
    }
  };

  // const prevJoinedCamp = localStorage.getItem('joinedCampaignInfo');
  // console.log(prevJoinedCamp, ':preg')

  const handleJoin = async () => {
    if (!userDetails?.address) {
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


  const verifyRecipients = async () => {
    try {
      const pkId = PACKAGE_ID
      const tx = new TransactionBlock()
      tx.moveCall({
        target: `${pkId}::campaign_management::verify_recipients`,
        arguments: [
            
            tx.object(CAMPAIGN_PACKAGE_ID),
            tx.pure.string(campaignInfo?.name),
            tx.pure(acceptedNames),
            tx.object(TOKEN_POLICY),         
            tx.object(LOCAL_COIN_APP)
        ],

    });

    const result = await flow.sponsorAndExecuteTransactionBlock({
      network: APP_NETWORK,
      transactionBlock: tx,
      client: SUI_CLIENT
    });

    return result
    } catch (error) {
      console.log(error)

      throw error
    }
  }


  const handleVerify = async () => {

    try {
      setVerifyLoader(true)
      if(acceptedNames.length === 0) {
        toast.error('Please select participants to verify')
        throw new Error ('Please select participants to verify')
      }
      if(isCampaignEnded) {
        toast.error('Campaign has ended')
        throw new Error ('Campaign has ended')
      }
      if(isParticipantFull()) {
        toast.error('Cannot verify. Participant limit has reached')
        throw new Error ('Cannot verify. Participant limit has reached')
      }
      const respose =  await verifyRecipients()
      if(!respose?.digest) throw error;
      toast.success('Successfully verified participants')
      await fetchCampaignParticipate()
      setVerifyLoader(false)
      setVerifyConfirm(false)
      setAcceptedNames([])
      setData({
        username: '',
        recipientAddress: userDetails?.address
      })
    } catch (error: any) {
      console.log(error)
      toast.error('Recipients verification failed')
      setVerifyLoader(false)
      setVerifyConfirm(false)
    }
    
  };

  const endCampaign = async () => {
    // try {
    //   setShowLoader(true);
    //   const response = await campaignServices.end_campaign(userInfo, props.campaignId)
    //   if(response !== 'SUCCESS') throw error
    //   // toast.success('Campaign Ended Successfully')
    //   await getCampaignStatus();

    //   setShowLoader(false);
    //   setEndCampaignConfirm(false);
    // } catch (error: any) {
    //   console.log(error);
    //   setEndCampaignConfirm(false);
    //   setShowLoader(false);
    // }
  }

  const getVerifiedParticipants = () => {
    const verified = participantList.filter((item: any) => item.value)
    return verified.length
  }

  const handleIncentive = async () => {
    await generateQrCode();
    setRequestedIncentive(true);
  }


  const getUsername = () => {
    const allJoinedCampaignInfo = JSON.parse(localStorage.getItem('joinedCampaignInfo') || '');
    if(allJoinedCampaignInfo === '') return '';
    const currentCampaignInfo = allJoinedCampaignInfo.find((item : any) => item?.campaignAddress === props.campaignId)
    return currentCampaignInfo?.username
  }

  const isParticipantFull = () => {
    const isFull = getVerifiedParticipants() >= Number(campaignInfo?.no_of_recipients) 
    console.log(isFull, ':isFull')
    return false
  }

  const generateQrCode = async () => {
    try {
      const allJoinedCampaignInfo = JSON.parse(localStorage.getItem('joinedCampaignInfo') || '');
      const currentCampaignInfo = allJoinedCampaignInfo.find((item : any) => item?.campaignAddress === props.campaignId)
      const staticData = {
        type: 'campaign creator',
        publicKey: userDetails?.address,
        amount: (Number(1)/Number(campaignInfo?.no_of_recipients)).toFixed(2),
        proprietaryName: userInfo.proprietaryName,
        phoneNumber: userInfo.phoneNumber,
        storeName: userInfo.storeName,
        location: userInfo.location,
        campaignAddress: currentCampaignInfo?.campaignAddress ||  props.campaignId,
        campaignName: campaignInfo?.name,
        username: currentCampaignInfo?.username
      };
      const response = await QRCode.toDataURL(JSON.stringify(staticData));
      setImageUrl(response);
    } catch (error) {
      // debugger;
      console.log(error);
    }
  };

  // useEffect(() => {
  //   console.log(userInfo, ':user')
  //   if(userDetails?.address) {
  //     if(participantList?.length > 0) {
  //       const verified = participantList.filter((item: any) => item.value)
  //       console.log(verified, ':all verified')
  //       const isCurrentUserVerified = verified.find((item: any) => item.address === userDetails?.address)
  //       console.log(isCurrentUserVerified, ':isVerified')

  //       if(Boolean(isCurrentUserVerified)){
  //         console.log('checking amount')
  //         campaignServices.get_amount_received(userInfo, props.campaignId).then((response: any) => {
  //           console.log(response, ':esponse')
  //           setParticipantPaymentReceived(Number(response) > 0)
  //         })
  //       }
  //     }
  //   }

  // }, [userInfo, participantList])

  useEffect(() => {
    if (userDetails?.address) {
      console.log({ userInfo });
      getCampaginOwner();
      fetchCampaignParticipate();
      getCampaignStatus()
    }

    return () => {
      setCurrentParticipant({})
      setIsCampaignEnded(false);
      setisCampaignAdmin(false);
      
    }
  }, [userDetails?.address]);

  console.log(isCampaignAdmin, ':isAdmin')

  if(isDetailsFetching || loader) {
    return (
      <section>
        <CampaignDetailSkeleton />
      </section>
    )
  }

  return (
    <>

      <section className="relative">
        {!requestedIncentive && (
          <div className="container mx-auto">
          

          <div onClick={() => router.back()} className="flex cursor-pointer items-center py-[18px]">
            <ChevronLeftIcon width={16} height={16} />
            <span className="text-[12px] font-normal">Back</span>
          </div>
          <div className="flex h-[90vh] flex-col justify-between">
            <div>
              <h3 className="text-base font-semibold">{campaignInfo?.name}</h3>
              <div className="my-[16px] relative w-full overflow-hidden rounded-[12px] border-[3px] border-solid border-[#D7D7D7]">
                <Image
                  src={'/campaignImg.png'}
                  alt="Store"
                  height={420}
                  width={400}
                  className="w-full"
                />
                {currentParticipant && Object.keys(currentParticipant).length > 0 && (
                  currentParticipant?.value ? (
                    <div className='absolute flex items-center bottom-[10px] right-[10px]  border border-[#fff] rounded-[6px] p-[2px] text-[#fff] text-xs font-normal'>
                      <span className='w-[10px] block h-[10px] rounded-[100%] bg-[#6ED365] mr-[2px]'></span> Verified
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

              <div className="my-[16px] flex flex-col gap-[17px]">
                <div className="flex items-center gap-[6px]">
                  <UserCircleIcon width={20} height={20} />
                  <div className="flex items-center gap-[4px]">
                    <p className="text-base font-medium text-[#000]">
                      {getVerifiedParticipants() || 0}/{campaignInfo?.no_of_recipients}
                    </p>
                    <span className="self-end text-[12px] font-normal italic text-[#A3A3A3]">
                      Verified participants/Number of participants
                    </span>
                  </div>
                </div>
                {/* {(currentParticipant?.value || isCampaignAdmin) && (
                  <div className="flex items-center gap-[6px]">
                    <CurrencyDollarIcon width={20} height={20} />
                    <div className="items-cente flex gap-[4px]">
                      <p className="text-base font-medium text-[#000]">{campaignInfo?.amount || 0}</p>
                      <span className="self-end text-[12px]  font-normal italic text-[#A3A3A3]">
                        LocalCoin
                      </span>
                    </div>
                </div>

                )} */}
                {(currentParticipant?.value || isCampaignAdmin) && (
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
                          <span>{eachParticipant.userName}{' '}</span>
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
                            <div  className='text-xs font-normal'>Verified</div>
                          ) : (
                            <div  className='text-xs font-normal'>Unverified</div>
                          )}
                          <div className='w-[25px]'>
                              <input 
                                checked={acceptedNames.includes(eachParticipant.address)} 
                                type="checkbox" id={`accept-${eachIndex + 1}`} 
                                className='verification-checkbox ticked-checkbox'
                                onChange={(e) => handleCheckboxChange(eachParticipant.address, e.target.checked)} 
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
                      'Verifying'
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
                <Button handleClick={() => {if(!isCampaignEnded) setEndCampaignConfirm(true)}} buttonType={'outlined'} text={isCampaignEnded ? 'Campaign Ended' : 'End Campaign'}/>
              ) 
              : isCampaignEnded ? (
                <Button buttonType={'outlined'} text={'Campaign Ended'}/>
              )
              : (
                currentParticipant?.value ? (
                  <Button disabled={participantPaymentReceived} handleClick={handleIncentive} buttonType={'secondary'}  text={participantPaymentReceived ? 'Payment Received' :'Request Incentives'}/>
                ) : (
                  isParticipantFull() ? (
                    <Button disabled={true} text='Paticipant Limit Reached' />
                  ) : (
                    <Button disabled={Boolean(currentParticipant) && Object.keys(currentParticipant).length > 0} handleClick={handleJoin} text={Boolean(currentParticipant) && Object.keys(currentParticipant).length > 0 ? 'Requested to join' : 'Join Campaign'} />
                  )
                  
                )
                
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
                  <XMarkIcon width={20} height={20} />
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
                  <XMarkIcon width={20} height={20} />
                </span>
                <div className="flex flex-col gap-[20px] pl-[20px]">
                  <h3 className='text-lg font-extrabold text-center'>Are you sure you want to verify selected participants?</h3>
                  <Button disabled={verifyLoader} showLoader={verifyLoader} handleClick={handleVerify} text="Yes, Verify" />
                </div>
              </div>
            </div>
          )}

          {endCampaignConfirm && (
            <div className="username-modal flex items-center justify-between">
              <div className="relative mx-auto flex h-[200px] w-[80%] items-center justify-center overflow-hidden rounded-[16px] bg-[#fff] p-[16px]">
                <span
                  onClick={() => setEndCampaignConfirm(false)}
                  className="absolute right-[4px] top-[4px] flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-[100%] border border-[#000]"
                >
                  <XMarkIcon width={20} height={20} />
                </span>
                <div className="flex flex-col gap-[20px] pl-[20px]">
                  <h3 className='text-lg font-extrabold text-center'>Are you sure you want to end the campaign?</h3>
                  <Button disabled={showLoader} showLoader={showLoader} handleClick={endCampaign} text="Yes, End campaign" />
                </div>
              </div>
            </div>
          )}
          </div>
        )}

        {requestedIncentive && imageUrl && (
          <div className="container mx-auto">
            <div>
              <Link href={'#'}>
                  <div onClick={() => setRequestedIncentive(false)} className='cursor-pointer py-[18px] flex items-center'>
                      <ChevronLeftIcon width={16} height={16} />
                      <span className='text-[12px] font-normal'>Back</span>
                  </div>
              </Link>
            </div>
            <h3 className="text-base font-semibold text-[#000]">Request Incentives</h3>

            <div className="flex flex-col mt-[18px] items-center jusitfy-center gap-[12px]">
              <div className="w-[80px] h-[80px] rounded-[100%] bg-[#EAEBEE]"></div>
              <div className="text-[24px] font-normal text-[#000]">
                  {getUsername()}
              </div>
              <div className="text-base font-[400] italic">
                  {maskWalletAddress(userDetails?.address)}
              </div>
            </div>
            {/* QR SCANNER PART */}
            {imageUrl && (
              <>
                  <div className="w-full flex items-center justify-center">
                  <Image src={imageUrl} alt="img" width={240} height={240} />
                  </div>

                  <p className="text-base font-normal text-center mt-[12px]">Campaign creator will need to scan your QR code to send you the payment</p>
              </>

            )}
          
           
          </div>
        )}
        
      </section>
    </>
  );
};

export default CampaignDetail;
