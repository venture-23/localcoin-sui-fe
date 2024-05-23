"use client"
import { ChevronLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEnokiFlow } from '@mysten/enoki/react';
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { useWallet } from "@suiet/wallet-kit";
import Button from "components/botton";
import { ConfirmationScreen } from "components/confirmationScreen";
import { useGetBalance, useLogin } from "hooks";
import { useMyContext } from "hooks/useMyContext";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { campaignServices } from "services/campaign-services";
import { PACKAGE_ID, TOKEN_POLICY, USDC_TREASURY, USDC_TYPE } from "utils/constants";
import { APP_NETWORK, SUI_CLIENT } from "utils/sui";


const Withdraw = () => {
    const { userBalance } = useGetBalance()
    const [confirmWithdraw, setConfirmWithdraw] = useState(false)
    const [showLoader, setShowLoader] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const { userInfo } = useMyContext();
    const { signAndExecuteTransactionBlock } = useWallet()
    // const { tokenList } = useRecipient({});
    // console.log(tokenList, ':token')
    const flow = useEnokiFlow()
    const { userDetails } = useLogin()

    const requestSettlement = async () => {
      try {
        const pkId = PACKAGE_ID
        const localCoinObj = await campaignServices.getTokenObj(userDetails?.address)
        const tx = new TransactionBlock()
        console.log({
          USDC_TREASURY,
          localCoinObj,
          TOKEN_POLICY
        })
        tx.moveCall({
          target: `${pkId}::campaign_management::request_settlement`,
          arguments : [
            tx.object(USDC_TREASURY),
            tx.object(localCoinObj),
            tx.object(TOKEN_POLICY)
          ],
          typeArguments: [USDC_TYPE]
        })

        const result = await flow.sponsorAndExecuteTransactionBlock({
          network: APP_NETWORK,
          transactionBlock: tx,
          client: SUI_CLIENT
        });

        if(!result.digest) throw new Error('Failed seltting funds')
        return result
      } catch (error) {
        console.log(error)
        throw error
      }
    }

    const withdrawFunds = async () => {
      try {
        if(!userBalance) {
          throw new Error('No funds to withdraw');
        }
        setShowLoader(true)
        
        const response = await requestSettlement()
        if(!response?.digest) throw new Error('Failed Withdrawing Funds')
        console.log(response)

        toast.success('Funds withdrawn successfully')
        setShowLoader(false)
        setConfirmWithdraw(false)
        setShowSuccess(true);
        
      } catch (error:any) {
        console.log(error)
        setShowLoader(false)
        setConfirmWithdraw(false)
        toast.error('Failed withdawing funds')
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
                           <h2 className="text-[32px] font-">{userBalance ?? 0}</h2>
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