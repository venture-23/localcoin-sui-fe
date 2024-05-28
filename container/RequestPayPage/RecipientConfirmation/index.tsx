"user-client";
import { XMarkIcon } from '@heroicons/react/16/solid';
import Button from 'components/botton';
import { useGetBalance } from 'hooks';
import Image from 'next/image';
import { KeyboardEvent } from 'react';
import { toast } from 'react-toastify';

interface IRecipientConfirmProps {
    amount: number | string
    setAmount?: React.Dispatch<React.SetStateAction<string>>
    storeName: string
    handleClick:() => void
    type?: string
    campaignName?: string
    showLoader?: boolean
    transferConfirmation?: boolean
    setTransferConfirmation: React.Dispatch<React.SetStateAction<boolean>>
    cancelPayment:() => void
    participantName?: string
}

const controlKeys = [
    "Backspace",
    "Delete",
    "Tab",
    "Escape",
    "Enter",
    "ArrowLeft",
    "ArrowRight",
    "Home",
    "End",
  ];

const RecipientConfirmation = ({ amount, setAmount, participantName = 'ABC', storeName, handleClick, type, campaignName, showLoader, transferConfirmation, setTransferConfirmation, cancelPayment }: IRecipientConfirmProps) => {
    const { userBalance } = useGetBalance()
    const handleTransfer = () => {
        if(type === 'campaign') {
            handleClick()
        } else {
            const isErr = Number(amount) >  Number(userBalance)
            if(isErr) {
                toast.error('Insuficient balance')
                return
            }
            handleClick()
        }
        if(typeof window !== 'undefined') {
            localStorage.removeItem('paymentUrl')
        }
    }
  return (
    <section className="w-full relative bg-[#1653AE] h-[100vh]">
            <div className="success-vector-1">
                <Image 
                    src={'/successScreenVector1.png'}
                    height={120}
                    width={120}
                    alt="z"
                />
            </div>
            <div className="success-vector-2">
                <Image 
                    src={'/successScreenVector2.png'}
                    height={120}
                    width={120}
                    alt="z"
                />
            </div>
            <div className="h-[100%] mx-auto">
                <div className="h-[100%] flex flex-col justify-between">
                    <div onClick={() => cancelPayment()} className='h-[24px] w-[24px] cursor-pointer absolute left-[10px] top-[10px]'>
                        <XMarkIcon color='#fff' width={24} height={24} />
                    </div>
                    <div className="flex flex-col mt-[100px] gap-[12px] items-center">
                        <div>
                            <Image 
                                src={'/localCoinLogo.png'}
                                height={83}
                                width={83}
                                alt="Local Coin"
                            />
                        </div>
                        <h3 className="text-2xl font-semibold text-[#fff]">
                            {type === 'campaign' ? 
                               `${amount || 0} LocalCoin` : `${amount == 0 ? '' : amount} LocalCoin`
                            }
                        </h3>
                        <p className='italic my-[12px] text-white text-base font-normal'>{type === 'campaign' ? campaignName : storeName}</p>
                        <div className="text-base container mx-auto font-medium text-[#fff] text-center">
                            {type === 'campaign' ? (
                                `You are about to pay ${amount} LocalCoin to ${participantName} for completing the campaign ${campaignName}`
                            ): (
                                `Enter the amount you want to pay to "${storeName}"`
                            )}
                            
                        </div>

                            {type === 'merchant' && (
                                <div >
                                <input 
                                    value={amount} 
                                    onChange={(e) => setAmount && setAmount(e.target.value)} 
                                    placeholder='Enter Amount' 
                                    className='bg-white w-full rounded-[4px] py-[8px] px-[4px]' 
                                    type="text" 
                                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                                        const { key, keyCode, target } = e
                                        console.log(key)
                                        const { value } = target as HTMLInputElement;
                                        console.log(value)
                                        if (controlKeys.includes(key)) {
                                            return; 
                                        }
                                    
                                        
                                        if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)) {
                                          return; 
                                        }
                                    
                                       
                                        if (key === "." && !value.includes(".")) {
                                            console.log('key', key)
                                          return;
                                        }
    
                                        e.preventDefault()
                                          
                                    }}
                                />
                            </div>
                            )}
                        
                        {type === 'merchant' && (
                            <div className='mt-[40px] text-center text-2xl font-semibold text-[#fff]'>
                            Available LocalCoin: {userBalance}
                        </div>
                        )}
                        
                    </div>
                    <div className="container mx-auto mb-[10px]">
                        <Button handleClick={() => setTransferConfirmation(true)} buttonType={'secondary'} text="Send Payment" />

                        {transferConfirmation && (
                            <div className="username-modal flex items-center justify-between">
                              <div className="relative mx-auto flex h-[200px] w-[80%] items-center justify-center overflow-hidden rounded-[16px] bg-[#fff] p-[16px]">
                                <span
                                  onClick={() => setTransferConfirmation(false)}
                                  className="absolute right-[4px] top-[4px] flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-[100%] border border-[#000]"
                                >
                                  <XMarkIcon width={20} height={20} />
                                </span>
                                <div className="flex flex-col gap-[20px] pl-[20px]">
                                  <h3 className='text-lg font-extrabold text-center'>Are you sure you want to transfer the funds?</h3>
                                  <Button disabled={showLoader} showLoader={showLoader} handleClick={handleTransfer} text="Yes, Transfer Funds" />
                                </div>
                              </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
  )
}

export default RecipientConfirmation