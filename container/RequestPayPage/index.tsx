"use client"

import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { BackspaceIcon } from "@heroicons/react/24/outline";
import Button from "components/botton";
import { ConfirmationScreen } from "components/confirmationScreen";
import DrawerQrScan from "components/drawer-qr-scan";
import { useMerchant, useRecipient } from "hooks";
import { useMyContext } from "hooks/useMyContext";
import Image from "next/image";
import Link from "next/link";
import QRCode from 'qrcode';
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import RecipientConfirmation from "./RecipientConfirmation";


const RequestPay = () => {
    const [selected, setSelected] = useState(1)
    const [amount, setAmount] = useState("")
    const [paymentRequested, setPaymentRequested] = useState(false);
    const [delayScan, setDelayScan] = useState(500);
    const [imageUrl, setImageUrl] = useState('');
    const { userInfo } = useMyContext()
    const buttonRef = useRef<any>(null);
    const [scanData, setScanData] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const [data, setData] = useState<any>({})
    const [openConfirmation, setOpenConfirmation] = useState(false);

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
            setOpenConfirmation(false);
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
          merchant_info &&
          Object.keys(merchant_info)?.length > 0 &&
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
          setData({ ...data, ...merchant_info, merchant_associated });
        }
      }, [merchant_info, merchant_associated]);

    const handleRemove = () => {
        if (amount) {
            setAmount((prevAmt: string) => prevAmt.slice(0, -1));
          }
    }

    const handleClick = (value : string | number) => {
        const enterAmount = amount + value.toString();
        setAmount(enterAmount);
    }

    const handlePaymentRequest = async () => {
       
        await generateQrCode()
        setPaymentRequested(true);
    }

    const generateQrCode = async () => {
        try {
          const staticData = {
            type: 'merchant',
            publicKey: userInfo.publicKey,
            amount: amount || 0,
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

      const handleSendToken = async () => {
        sendTokenToMerchant()
        setPaymentSuccess(true)
      }
  return (
    <section>
        {!paymentRequested && !openConfirmation &&(
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
                        className={`flex-1 cursor-pointer py-[8px] ${selected === 2 && 'bg-[#EAEBEE]'} flex items-center justify-center  rounded-[26px] text-center text-lg font-semibold`}>pay</div>
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
                        <Button handleClick={handlePaymentRequest} buttonType={'tertiary'} text="Request" />
                    </div>
                    </div>
                    <div className="p-[6px]">
                    <div className="grid bg-[#ced2d9] backdrop-blur-[35px] w-full grid-cols-3 gap-3 rounded-[5px] p-3">
                  {new Array(9).fill('0').map((x, index) => (
                    <div
                      className="rounded-[5px] bg-white p-[12px] text-center"
                      key={index + 1 + ''}
                      onClick={() => handleClick(index + 1 + '')}
                    >
                      {' '}
                      {index + 1}
                    </div>
                  ))}
                  <div className="pointer-events-none bg-none"></div>
                  <div className="">
                    <div
                      className="col-span-3 rounded-[5px] bg-white p-[12px] text-center"
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

                <div className="flex flex-col items-center jusitfy-center gap-[12px]">
                    <div className="w[80px] h-[80px] rounded-[100%] bg-[#EAEBEE]"></div>
                    <div className="text-[24px] font-normal text-[#000]">
                        {amount || 0 } LocalCoin
                    </div>
                    <div className="text-base font-[400] italic">
                        My Kitty Cat Store
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

        {openConfirmation && !isSendToMerchantSucc && (
            <RecipientConfirmation handleClick={handleSendToken} amount={"30"} storeName={"My Kitty Cat"}  />
        )}

        {isSendToMerchantSucc && (
            <ConfirmationScreen type="receipent_transfer_success" />
        )}

        
    </section>
  )
}

export default RequestPay