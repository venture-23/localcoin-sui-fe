"use client"

import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { BackspaceIcon } from "@heroicons/react/24/outline";
import Button from "components/botton";
import { useMyContext } from "hooks/useMyContext";
import Image from "next/image";
import Link from "next/link";
import QRCode from 'qrcode';
import { useState } from "react";


const RequestPay = () => {
    const [selected, setSelected] = useState(1)
    const [amount, setAmount] = useState("")
    const [paymentRequested, setPaymentRequested] = useState(false);
    const [delayScan, setDelayScan] = useState(500);
    const [imageUrl, setImageUrl] = useState('');
    const { userInfo } = useMyContext()

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
  return (
    <section>
        {!paymentRequested && (
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
                    <div onClick={() => setSelected(2)} className={`flex-1 cursor-pointer py-[8px] ${selected === 2 && 'bg-[#EAEBEE]'} flex items-center justify-center  rounded-[26px] text-center text-lg font-semibold`}>pay</div>
                </div>
                </div>
            </div>

            {/* {selected === 1 && (
                
            )} */}

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
        </div>
        )}
        

        {paymentRequested && (
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

        
    </section>
  )
}

export default RequestPay