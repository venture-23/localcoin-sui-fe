"use client"

import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { BackspaceIcon } from "@heroicons/react/24/outline";
import { useEnokiFlow } from '@mysten/enoki/react';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { useWallet } from "@suiet/wallet-kit";
import Button from "components/botton";
import { ConfirmationScreen } from "components/confirmationScreen";
import DrawerQrScan from "components/drawer-qr-scan";
import { useCamapigns, useLogin, useMerchant, useRecipient } from "hooks";
import { useMyContext } from "hooks/useMyContext";
import Image from "next/image";
import Link from "next/link";
import QRCode from 'qrcode';
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { campaignServices } from "services/campaign-services";
import { CAMPAIGN_PACKAGE_ID, PACKAGE_ID, TOKEN_POLICY } from "utils/constants";
import { APP_NETWORK, SUI_CLIENT } from "utils/sui";
import RecipientConfirmation from "./RecipientConfirmation";

interface IScannedDataProps {
    type?: string
    publicKey?: string
    amount?: string | number
    proprietaryName?: string
    phoneNumber?: string
    storeName?: string
    location?: string
    campaignAddress?: string
    campaignName?: string
    username?: string
}


const RequestPay = () => {
    const [selected, setSelected] = useState(1)
    const [amount, setAmount] = useState("")
    const [paymentRequested, setPaymentRequested] = useState(false);
    const [delayScan, setDelayScan] = useState(500);
    const [imageUrl, setImageUrl] = useState('');
    const { userInfo } = useMyContext()
    const buttonRef = useRef<any>(null);
    const flow = useEnokiFlow()
    // const [scanData, setScanData] = useState(JSON.stringify(
    //   {
    //     type:"campaign creator",
    //     publicKey:"GBM5WSMHTRCXMFDLHWO2KV2SJV25PBECZIDT33FDNOWZVBC4JAJVZFH4",
    //     amount:1,
    //     proprietaryName:"",
    //     phoneNumber:"",
    //     storeName:"",
    //     location:"",
    //     campaignAddress:"CAMZRDZ4IKJTRTZ7WV35F2JEJO7NVROC2LBIGUNPXKM6A4HW3NGTOSAP",
    //     campaignName:"Blood Doantion"
    //   }
    // ));
    const [scanData, setScanData] = useState('')
    const [formattedScannedData, setFormattedScannedData] = useState<IScannedDataProps>({})
    const [paymentSuccessLoader, setPaymentSuccessLoader] = useState(false)
    const [data, setData] = useState<any>({})
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [transferConfirmation, setTransferConfirmation] = useState(false);
    const [creatorPaymentSuccess, setCreatorPaymentSuccess] = useState(false);
    const [merchantPaymentSuccess, setMerchantPaymentSuccess] = useState(false);
    const [storeName, setStoreName] = useState('')
    const { signAndExecuteTransactionBlock } = useWallet()
    const { userDetails } = useLogin()


    const {  merchant_associated } = useMerchant(
        {
          merchantAddress: data?.merchantAddress || '',
          tokenId: data?.tokenAddress || '',
          data
        }
      );
  
    const { tokenList, isSendToMerchantSucc } = useRecipient({
      data
    });


    const { merchantList } = useCamapigns({ fetchAllCampaign: true});
    console.log(merchantList, ':merchant1')

    console.log(isSendToMerchantSucc, ':isSend')

    useEffect(() => {
        if (isSendToMerchantSucc) {
            setOpenConfirmation(false);
          setScanData('');
          setData({});
        }
      }, [isSendToMerchantSucc]);


      const handleCancelPayment = () => {
        setOpenConfirmation(false)
        setScanData('')
        setData({})
        setFormattedScannedData({})
        setSelected(1);

      }


    useEffect(() => {
        if (scanData) {
          const scannedData = JSON.parse(scanData);
          setFormattedScannedData(scannedData);
          if (scannedData?.publicKey) {
            console.log({ publicKey: scannedData?.publicKey });
            // setFetch_merchant_info(true);
            setData({ ...data, merchantAddress: scannedData?.publicKey, amount: scannedData?.amount });
            setOpenConfirmation(true);
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

      useEffect(() => {
        if (
          data.merchantAddress &&
          merchant_associated
        ) {
          if (merchant_associated?.length) {
            if (merchant_associated.includes(data.merchantAddress)) {
         
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
          setData({ ...data, merchant_associated });
        }
      }, [merchant_associated]);

    const handleRemove = () => {
        if (amount) {
            setAmount((prevAmt: string) => prevAmt.slice(0, -1));
          }
    }

    const handleClick = (value : string | number) => {
        if(value === '.' && amount.length === 0) return
        if(value === '.' && amount.includes('.')) return
        const enterAmount = amount + value.toString();
        setAmount(enterAmount);
    }

    const handlePaymentRequest = async () => {
        const merchant = merchantList?.find(item => item?.merchant_address === userDetails?.address)
        if(!merchant || Object.keys(merchant).length === 0) {
          toast.error('You are not a verified mechant.')
          return;
        }
        await generateQrCode(merchant)
        setPaymentRequested(true);
    }

    const generateQrCode = async (merchant: any) => {
        try {
          console.log(merchant, ':merchant')
          setStoreName(merchant?.store_name)
          
          const staticData = {
            type: 'merchant',
            publicKey: userDetails?.address,
            amount: amount || 0,
            proprietaryName: merchant?.proprietor,
            phoneNumber: merchant?.phone_no,
            storeName: merchant?.store_name,
            location: merchant?.location
          };
          const response = await QRCode.toDataURL(JSON.stringify(staticData));
          setImageUrl(response);
        } catch (error) {
          // debugger;
          console.log(error);
        }
      };

      const sendTokenToRecipient = async () => {
        try {
          console.log(formattedScannedData, ':scannedDData')
          const pkId = PACKAGE_ID
          const tx = new TransactionBlock()
          const amount = +formattedScannedData?.amount * Math.pow(10, 6)
          const localCoinObj = await campaignServices.getTokenObj(userDetails?.address)
          console.log(amount, ':forAmt')
          console.log({
            CAMPAIGN_PACKAGE_ID,
            campaignName: formattedScannedData?.campaignName,
            recipientAddr: formattedScannedData?.publicKey,
            localCoinObj,
            TOKEN_POLICY


          })
          tx.moveCall({
            target: `${pkId}::campaign_management::transfer_token_to_recipient`,
            arguments: [
                tx.object(CAMPAIGN_PACKAGE_ID),
                tx.pure.string(formattedScannedData?.campaignName as string),
                tx.pure.u64(amount),
                // address of recipients
                tx.pure.address(formattedScannedData?.publicKey as string),
                // local coin token
                tx.object(localCoinObj),
                tx.object(TOKEN_POLICY),
            ],
          })

          const result = await flow.sponsorAndExecuteTransactionBlock({
            network: APP_NETWORK,
            transactionBlock: tx,
            client: SUI_CLIENT
          });
          

          if(result?.digest) {
            return result
          } else throw new Error('Transaction Failed')
        } catch (error) {
          console.log(error)
          throw error
        }
      }
      const sendTokenToMerchant = async () => {
        try {
          const pkId = PACKAGE_ID
          const tx = new TransactionBlock()
          const amount = +formattedScannedData?.amount * Math.pow(10, 6)
          const localCoinObj = await campaignServices.getTokenObj(userDetails?.address)
          console.log(amount, ':forAmt')
          tx.moveCall({
            target: `${pkId}::local_coin::transfer_token_to_merchants`,
            arguments: [
                tx.pure.address(formattedScannedData?.publicKey as string),
                tx.object(localCoinObj),
                tx.object(TOKEN_POLICY)
                
            ],
          })
          const result = await flow.sponsorAndExecuteTransactionBlock({
            network: APP_NETWORK,
            transactionBlock: tx,
            client: SUI_CLIENT
          });

          if(result?.digest) {
            return result
          } else throw new Error('Transaction Failed')
        } catch (error) {
          console.log(error)
          throw error
        }
      }

      const handleSendToken = async () => {
        try {
          setPaymentSuccessLoader(true)
            if(formattedScannedData?.type === 'campaign creator') {
                // await campaignServices.transfer_tokens_to_recipient(
                //   userInfo?.secretKey, 
                //   formattedScannedData?.publicKey as string, 
                //   formattedScannedData?.amount as number, 
                //   formattedScannedData?.campaignAddress as string
                // );
                const paymentTx = await sendTokenToRecipient()
                if(!paymentTx?.digest) throw 'Failed Transferring Funds'
                toast.success('Amount transferred to participant')
                setPaymentSuccessLoader(false)
                setCreatorPaymentSuccess(true)
            } else {
                // sendTokenToMerchant()
                // await campaignServices.transfer_tokens_from_recipient_to_merchant(
                //   userInfo.secretKey,
                //   formattedScannedData?.amount as number,
                //   data?.tokenAddress,
                //   data?.merchantAddress,
                //   userDetails?.address
                // );
                
                const paymentTx = await sendTokenToMerchant()
                if(!paymentTx?.digest) throw 'Failed Transferring Funds'
                toast.success('Amount transferred to merchant')
                setPaymentSuccessLoader(false)
                setMerchantPaymentSuccess(true)
            }
            
            setTransferConfirmation(false);
            setOpenConfirmation(false);
            setData({});
        } catch (error: any) {
            console.log(error)
            toast.error('Error: Failed transferring the funds')
            setPaymentSuccessLoader(false)
        }
      }

      console.log(formattedScannedData, ':formatdata')
      console.log(data, ':data')
  return (
    <section className="non-scrollable-section">
        {!paymentRequested && !openConfirmation && !creatorPaymentSuccess && !merchantPaymentSuccess &&(
            <div className="flex flex-col min-h-[100vh] justify-between">
            <div className="container mx-auto">
                <div>
                <Link href={'/'}>
                    <div className='cursor-pointer py-[18px] flex items-center'>
                        <ChevronLeftIcon width={16} height={16} />
                        <span className='text-[12px] font-normal'>Back</span>
                    </div>
                </Link>
                </div>

                <div>
                <div className="w-[100%] h-[56px] border border-[#C5C5C5] rounded-[41px] bg-[#fff] flex items-center p-[8px] justify-between">
                    <div onClick={() => setSelected(1)} className={`flex-1 cursor-pointer py-[8px] ${selected === 1 && 'bg-[#EAEBEE]'} flex items-center justify-center rounded-[26px] text-center text-lg font-semibold`}>Request</div>
                    <div 
                        onClick={() => {
                            setSelected(2)
                            buttonRef.current.open()
                        }} 
                        className={`flex-1 cursor-pointer py-[8px] ${selected === 2 && 'bg-[#EAEBEE]'} flex items-center justify-center  rounded-[26px] text-center text-lg font-semibold`}>Pay</div>
                </div>
                </div>
            </div>

            
            {selected === 1 && (
                <div>
                    <div className="container mx-auto">
                    <div className="flex flex-col gap-[12px]">
                        <div className="flex text-base font-semibold text-[#000] items-center px-[16px] w-full h-[54px] border border-[#E2E2E2] rounded-[4px]">
                            {amount || 0} LocalCoins
                        </div>
                        <Button disabled={amount === '' || amount === '0'} handleClick={handlePaymentRequest} buttonType={'tertiary'} text="Request" />
                    </div>
                    </div>
                    <div className="mt-[12px]">
                      <div className="grid bg-[#ced2d9] backdrop-blur-[35px] w-full grid-cols-3 gap-3 p-3">
                        {new Array(9).fill('0').map((x, index) => (
                    <div
                      className="rounded-[5px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.30)] bg-white p-[12px] text-center"
                      key={index + 1 + ''}
                      onClick={() => handleClick(index + 1 + '')}
                    >
                      {' '}
                      {index + 1}
                    </div>
                        ))}
                        {/* <div className="pointer-events-none bg-none"></div> */}
                        <div className="">
                          <div
                            className="col-span-3 h-[48px] flex items-center justify-center shadow-[0px_1px_0px_0px_rgba(0,0,0,0.30)] rounded-[5px] bg-white p-[12px] text-center"
                            onClick={() => handleClick('.' + '')}
                          >
                            <div className="w-[5px] h-[5px] bg-black rounded-[50%]"></div>
                          </div>
                        </div>
                        <div className="">
                          <div
                            className="col-span-3 shadow-[0px_1px_0px_0px_rgba(0,0,0,0.30)] rounded-[5px] bg-white p-[12px] text-center"
                            onClick={() => handleClick(0 + '')}
                          >
                            0
                          </div>
                        </div>
                        <div
                    className="flex items-center justify-center rounded-md bg-none p-[12p]"
                    onClick={() => handleRemove()}
                  >
                    <BackspaceIcon className="h-6 w-6" />
                        </div>
                      </div>
                    </div>
                </div>

            )}

          
            <DrawerQrScan
                // shareQr={true}
                ref={buttonRef}
                setScanData={setScanData}
                panelTitle="Scan QR Code"
                closePayMode={() => setSelected(1)}
            />

            
        </div>
        )}
        

        {paymentRequested && !openConfirmation && (
            <div className="container mx-auto">
                <div>
                    <Link href={'#'}>
                        <div onClick={() => setPaymentRequested(false)} className='cursor-pointer py-[18px] flex items-center'>
                            <ChevronLeftIcon width={16} height={16} />
                            <span className='text-[12px] font-normal'>Back</span>
                        </div>
                    </Link>
                </div>
                <h3 className="text-base font-semibold text-[#000]">Payment Request</h3>

                <div className="flex flex-col mt-[18px] items-center jusitfy-center gap-[12px]">
                    <div className="w-[80px] h-[80px] rounded-[100%] bg-[#EAEBEE]"></div>
                    <div className="text-[24px] font-normal text-[#000]">
                        {amount || 0 } LocalCoin
                    </div>
                    <div className="text-base font-[400] italic">
                        {storeName}
                    </div>
                </div>
                {/* QR SCANNER PART */}
                {imageUrl && (
                    <>
                        <div className="w-full flex items-center justify-center">
                        <Image src={imageUrl} alt="img" width={240} height={240} />
                        </div>

                        <p className="text-base font-normal text-center mt-[12px]">Participant must scan your QR code to send you the payment</p>
                    </>

                )}
                
                 
            </div>
        )}

        {openConfirmation && !merchantPaymentSuccess && (
            <RecipientConfirmation 
              campaignName={formattedScannedData?.campaignName} 
              type={formattedScannedData?.type === 'campaign creator' ? 'campaign' : 'merchant'} 
              handleClick={handleSendToken} 
              amount={formattedScannedData?.amount as number} 
              storeName={formattedScannedData?.storeName as string}  
              setTransferConfirmation={setTransferConfirmation}
              transferConfirmation={transferConfirmation}
              showLoader={paymentSuccessLoader}
              participantName={formattedScannedData?.username}
              cancelPayment={handleCancelPayment}
            />
        )}

        {merchantPaymentSuccess && (
            <ConfirmationScreen type="receipent_transfer_success" />
        )}

        {creatorPaymentSuccess && (
            <ConfirmationScreen type="creator_transfer_success" />
        )}
        

        
    </section>
  )
}

export default RequestPay