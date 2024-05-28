import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useEnokiFlow } from '@mysten/enoki/react';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { ConfirmationScreen } from 'components/confirmationScreen';
import { useLogin } from 'hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { campaignServices } from 'services/campaign-services';
import { CAMPAIGN_PACKAGE_ID, PACKAGE_ID, TOKEN_POLICY } from 'utils/constants';
import { APP_NETWORK, SUI_CLIENT } from 'utils/sui';
import RecipientConfirmation from '../RecipientConfirmation';

const Payment = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    console.log(searchParams, ':searchh')
    const type = searchParams.get('type')
    const campaginName = searchParams.get('campaignName')
    const recipientAddress = searchParams.get('recipient')
    const recipientName = searchParams.get('recipientName')
    const amount = searchParams.get('amount')
    const { userDetails, login, isGoogleScreenLoading, isLoggedIn } = useLogin()
    console.log(userDetails, ':userDe')
    const flow = useEnokiFlow()

    const storeName = searchParams.get('storeName')
    const storeOwner = searchParams.get('storeOwner')
    const merchantAddress = searchParams.get('merchant')
    console.log(typeof type, ':type')
    const [transferConfirmation, setTransferConfirmation] = useState(false);
    const [paymentSuccessLoader, setPaymentSuccessLoader] = useState(false)
    const [creatorPaymentSuccess, setCreatorPaymentSuccess] = useState(false)
    const [merchantPaymentSuccess, setMerchantPaymentSuccess] = useState(false);
    const [transferAmt, setTransferAmt] = useState(amount ?? '')

    const handleCancelPayment = () => {
        router.push('/')
    }

    const sendTokenToRecipient = async () => {
        try {
          const pkId = PACKAGE_ID
          const tx = new TransactionBlock()
          const recAmount = +(transferAmt) * Math.pow(10, 6)
          const localCoinObj = await campaignServices.getTokenObj(userDetails?.address)
          
          console.log({
            amount,
            localCoinObj,
            campaginName,
            recipientAddress
          })
         
          tx.moveCall({
            target: `${pkId}::campaign_management::transfer_token_to_recipient`,
            arguments: [
                tx.object(CAMPAIGN_PACKAGE_ID),
                tx.pure.string(campaginName as string),
                tx.pure.u64(recAmount),
                // address of recipients
                tx.pure.address(recipientAddress as string),
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
          const recAmount = +(transferAmt) * Math.pow(10, 6)
          const localCoinObj = await campaignServices.getTokenObj(userDetails?.address)
          
          tx.moveCall({
            target: `${pkId}::local_coin::transfer_token_to_merchants`,
            arguments: [
                tx.pure.u64(recAmount),
                tx.pure.address(merchantAddress as string),
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
              if(type == 'recipient') {
                  const paymentTx = await sendTokenToRecipient()
                  if(!paymentTx?.digest) throw 'Failed Transferring Funds'
                  toast.success('Amount transferred to participant')
                  setPaymentSuccessLoader(false)
                  setCreatorPaymentSuccess(true)
              } else {   
                  const paymentTx = await sendTokenToMerchant()
                  if(!paymentTx?.digest) throw 'Failed Transferring Funds'
                  toast.success('Amount transferred to merchant')
                  setPaymentSuccessLoader(false)
                  setMerchantPaymentSuccess(true)
              }
              
              setTransferConfirmation(false);
              if(typeof window !== 'undefined') {
                localStorage.removeItem('paymentUrl')
              }
          } catch (error: any) {
              console.log(error)
              toast.error('Error: Failed transferring the funds')
              setPaymentSuccessLoader(false)
              if(typeof window !== 'undefined') {
                localStorage.removeItem('paymentUrl')
              }
          }
    } 

    const handleLogin = async () => {
        login()

        if (typeof window !== 'undefined') {
            localStorage.setItem('paymentUrl', window.location.search)
        }
    }

    useEffect(() => {
        if(isLoggedIn) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('paymentUrl')
            }
        }
    }, [userDetails.address, isLoggedIn])

  return (
    <section className="non-scrollable-section">
        {!isLoggedIn && (
            <div className="container mx-auto">
                <div>
                        <div onClick={() => router.push('/')} className='cursor-pointer py-[18px] flex items-center'>
                            <ChevronLeftIcon width={16} height={16} />
                            <span className='text-[12px] font-normal'>Back</span>
                        </div>
                </div>
                <div>
                    {type == 'recipient' && (
                        <>
                            <h3 className='text-xl font-bold text-center'>Pay to recipient</h3>
                            <p className='text-center'>Sign in to continue with the payment</p>
                        </>
                    )}
                    {type == 'merchant' && (
                        <>
                            <h3 className='text-xl font-bold text-center'>Pay to merchant</h3>
                            <p className='text-center'>Sign in to continue with the payment</p>
                        </>
                    )}
                </div>
                <div className='flex mt-[200px] w-full items-center'>
                    <div onClick={handleLogin} className='border w-full border-[#000] rounded-[4px] px-[8px] py-[12px] flex items-center justify-center gap-4 text-lg font-bold cursor-pointer'>
                        <span>Sign in</span>
                        <img className='size-[24px]' src="https://img.icons8.com/color/48/google-logo.png" alt="Google" />
                        <TailSpin
                            visible={isGoogleScreenLoading}
                            height="20"
                            width="20"
                            color="#1653AE"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    </div>
                </div>
            </div> 
        )}


        {type && type.length > 0 && isLoggedIn && !creatorPaymentSuccess && !merchantPaymentSuccess && (
            <RecipientConfirmation 
            campaignName={campaginName as string} 
            type={type == 'recipient' ? 'campaign' : 'merchant'} 
            handleClick={handleSendToken} 
            amount={transferAmt}
            setAmount={setTransferAmt}
            storeName={storeName as string}  
            setTransferConfirmation={setTransferConfirmation}
            transferConfirmation={transferConfirmation}
            showLoader={paymentSuccessLoader}
            participantName={recipientName as string}
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

export default Payment