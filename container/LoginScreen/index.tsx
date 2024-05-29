"use client"
import Button from "components/botton";
import { useLogin } from "hooks";
import Image from "next/image";

export const LoginScreen = () => {
    const {isGoogleScreenLoading, login } = useLogin()



      const GoogleIcon = () => {
        return <img className='w-[20px]' src="https://img.icons8.com/color/48/google-logo.png" alt="" />
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
                    <div className="flex flex-col mt-[200px] gap-[12px] items-center">
                        <div>
                            <Image 
                                src={'/localCoinLogo.png'}
                                height={83}
                                width={83}
                                alt="Local Coin"
                            />
                        </div>
                        <h3 className="text-2xl font-semibold text-[#fff]">
                            LocalCoin
                        </h3>
                    </div>
                    <div className="container mx-auto mb-[50px]">
                        <Button handleClick={login} buttonIcon={<GoogleIcon />} showLoader={isGoogleScreenLoading}  buttonType={'secondary'} text="Login" />
    
                    </div>
                </div>
            </div>
        </section>
    )
}