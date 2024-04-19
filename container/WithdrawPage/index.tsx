"use client"
import { ChevronLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "components/botton";
import { ConfirmationScreen } from "components/confirmationScreen";
import { useGetBalance, useRecipient } from "hooks";
import { useMyContext } from "hooks/useMyContext";
import Link from "next/link";
import { useState } from "react";
import { campaignServices } from "services/campaign-services";

const Withdraw = () => {
    const { userBalance } = useGetBalance()
    const [confirmWithdraw, setConfirmWithdraw] = useState(false)
    const [showLoader, setShowLoader] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const { userInfo } = useMyContext();
    const { tokenList } = useRecipient({});
    console.log(tokenList, ':token')


    const withdrawFunds = async () => {
      try {
        if(!userBalance || !tokenList) {
          throw new Error('No funds to withdraw');
        }
        setShowLoader(true)
        console.log({
          publicKey: userInfo.publicKey,
          secretKey: userInfo.secretKey,
          amount: parseFloat(userBalance[0].amount),
          con: tokenList[0].contractToken
        })
        const response = await campaignServices.request_campaign_settlement(
          userInfo.publicKey,
          userInfo.secretKey,
          parseFloat(userBalance[0].amount),
          tokenList[0].contractToken
        );
        if(response != 'SUCCESS') throw new Error('Failed while withdrawing')
        console.log(response)

        setShowLoader(false)
        setConfirmWithdraw(false)
        setShowSuccess(true);
        
      } catch (error:any) {
        console.log(error)
        setShowLoader(false)
        setConfirmWithdraw(false)
      }
    }
     
  return (
    <section className="relative">
        <div className='container mx-auto'>
          {showSuccess ? (
            <ConfirmationScreen type="withdraw" />
          ) : (
            <>
              <Link href={'/'}>
                <div className='cursor-pointer py-[18px] flex items-center'>
                    <ChevronLeftIcon width={16} height={16} />
                    <span className='text-[12px] font-normal'>Back</span>
                </div>
              </Link>

              <div className="flex flex-col justify-between h-[90vh]">
                    <div>
                       <h2 className="text-xl font-semibold text-[#222] mb-[12px]">Withdraw Funds</h2>
                       <p className="text-base font-medium">You have LocalCoin ready to settle</p>

                       <div className="bg-[#fff] border p-[16px] mt-[16px] border-[#E4E4E7] rounded-[12px]">
                           <p className="text-base font-medium text-[#1384F5]">Total LocalCoin Available</p>
                           <h2 className="text-[32px] font-">{userBalance?.length > 0 ? Number(userBalance[0].amount).toString() : 0}</h2>
                       </div>
                    </div>

                    <div>
                        <Button handleClick={() => setConfirmWithdraw(true)} text="Withdraw" />
                    </div>

              </div>
            </>
          )}
          
        </div>


        {confirmWithdraw && (
            <div className="username-modal flex items-center justify-between">
              <div className="relative mx-auto flex h-[200px] w-[80%] items-center justify-center overflow-hidden rounded-[16px] bg-[#fff] p-[16px]">
                <span
                  onClick={() => setConfirmWithdraw(false)}
                  className="absolute right-[4px] top-[4px] flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-[100%] border border-[#000]"
                >
                  <XMarkIcon width={20} height={20} />
                </span>
                <div className="flex flex-col gap-[20px] pl-[20px]">
                  <h3 className='text-lg font-extrabold text-center'>Are you sure you want to withdraw your funds?</h3>
                  <Button disabled={showLoader} showLoader={showLoader} handleClick={withdrawFunds} text="Yes, Withdraw" />
                </div>
              </div>
            </div>
          )}
    </section>
  )
}

export default Withdraw