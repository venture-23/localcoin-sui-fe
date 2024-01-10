import Button from "components/botton"
import Image from "next/image"

interface IConfirmationScreenProps {
    text: string
}

export const ConfirmationScreen = ({ text }: IConfirmationScreenProps) => {
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
            <div className="container h-[100%] mx-auto">
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
                        <h3 className="text-2xl font-semibold text-[#fff]">Congratulations!</h3>
                        <div className="text-base font-medium text-[#fff] text-center">
                            {text}
                        </div>
                    </div>
                    <div className="mb-[10px]">
                        <Button link="/" buttonType={'secondary'} text="Go Home" />
                    </div>
                </div>
            </div>
        </section>
    )
}