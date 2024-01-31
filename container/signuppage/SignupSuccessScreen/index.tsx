import Button from "components/botton"
import useHandleCopy from "hooks/useCopyText"
import Image from "next/image"
import { maskWalletAddress } from "utils/clipper"

interface ISignupSuccessProps {
  publicKey: string
  secretKey: string
  handleSignUp:() => void
}

const SignUpSuccess = ({ publicKey, secretKey, handleSignUp }: ISignupSuccessProps) => {
  const [isCopied, handleCopy] = useHandleCopy({ showToast: true });

  const copyKeys = () => {
    const stringToCopy = JSON.stringify({
      publicKey,
      secretKey
    })
    handleCopy(stringToCopy)
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
            <div className="h-[100%] container mx-auto">
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
                            Congratulations !
                        </h3>
                        <div className="text-base font-medium text-[#fff] text-center">
                          Your key pair has been generated. <br /> Please keep them safe.
                        </div>
                        <div className=" w-full px-[12px] border rounded-[6px] border-[#E4E4E7] bg-white">
                          <div className="flex items-center justify-between py-[15px]  border-b-zinc-200 border-b border-solid">
                            <div className="text-base font-extrabold color-[#222]">
                              Public Key:
                            </div>
                            <div className="text-base font-medium color-[#222]">
                              {maskWalletAddress(publicKey)}
                            </div>
                          </div>
                          <div className="flex py-[15px] items-center justify-between">
                            <div className="text-base font-extrabold color-[#222]">
                                Secret Key:
                              </div>
                              <div className="text-base font-medium color-[#222]">
                                {maskWalletAddress(secretKey)}
                              </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto flex flex-col w-full gap-[12px] mb-[10px]">
                        <Button handleClick={copyKeys} link="/" buttonType={'white'} text="Copy Keys" />
                        <Button handleClick={handleSignUp} buttonType={'secondary'} text="Start Earning" />
                    </div>
                </div>
            </div>
        </section>
  )
}

export default SignUpSuccess