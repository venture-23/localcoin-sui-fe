import Button from 'components/botton'
import Image from 'next/image'

interface IRecipientConfirmProps {
    amount: number | string
    storeName: string
    handleClick:() => void
    type?: string
    campaignName?: string
}

const RecipientConfirmation = ({ amount, storeName, handleClick, type, campaignName }: IRecipientConfirmProps) => {
  return (
    <section className="w-full realtive bg-[#1653AE] h-[100vh]">
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
                            {amount || 0} LocalCoin
                        </h3>
                        <p className='italic my-[12px] text-white text-base font-normal'>{type === 'campaign' ? campaignName : storeName}</p>
                        <div className="text-base container mx-auto font-medium text-[#fff] text-center">
                            {type === 'campaign' ? (
                                `You are about to pay ${amount} of LocalCoin for completing the campaign`
                            ): (
                                `You are about to pay  ${amount || 0} LocalCoin to "${storeName}"`
                            )}
                            
                        </div>
                    </div>
                    <div className="container mx-auto mb-[10px]">
                        <Button handleClick={handleClick} buttonType={'secondary'} text="Send Payment" />
                    </div>
                </div>
            </div>
        </section>
  )
}

export default RecipientConfirmation