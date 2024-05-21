import Button from 'components/botton';
import useHandleCopy from 'hooks/useCopyText';
import Image from 'next/image';
import { maskWalletAddress } from 'utils/clipper';

interface ISignupSuccessProps {
  // publicKey: string;
  // secretKey: string;
  handleSignUp: () => void;
  address: string;
}

const SignUpSuccess = ({ handleSignUp, address }: ISignupSuccessProps) => {
  const [, handleCopy] = useHandleCopy({ showToast: true });
  // const router = useRouter()

  const copyKeys = () => {
    // const stringToCopy = JSON.stringify({
    //   publicKey,
    //   secretKey
    // });
    handleCopy(address);
  };

  // const signUp = () => {
  //   router.push("/")
  // }
  return (
    <section className="relative h-[100vh] w-full bg-[#1653AE]">
      <div className="success-vector-1">
        <Image src={'/successScreenVector1.png'} height={120} width={120} alt="z" />
      </div>
      <div className="success-vector-2">
        <Image src={'/successScreenVector2.png'} height={120} width={120} alt="z" />
      </div>
      <div className="container mx-auto h-[100%]">
        <div className="flex h-[100%] flex-col justify-between">
          <div className="mt-[100px] flex flex-col items-center gap-[12px]">
            <div>
              <Image src={'/localCoinLogo.png'} height={83} width={83} alt="Local Coin" />
            </div>
            <h3 className="text-2xl font-semibold text-[#fff]">Congratulations !</h3>
            <div className="text-center text-base font-medium text-[#fff]">
              You have successfully logged in.
            </div>
            <div className=" w-full rounded-[6px] border border-[#E4E4E7] bg-white px-[12px]">
              <div className="flex items-center justify-between border-b  border-solid border-b-zinc-200 py-[15px]">
                <div className="color-[#222] text-base font-extrabold">Public Key:</div>
                <div className="color-[#222] text-base font-medium">
                  {maskWalletAddress(address)}
                </div>
              </div>
              {/* <div className="flex py-[15px] items-center justify-between">
                            <div className="text-base font-extrabold color-[#222]">
                                Secret Key:
                              </div>
                              <div className="text-base font-medium color-[#222]">
                                {maskWalletAddress(secretKey)}
                              </div>
                            </div> */}
            </div>
          </div>
          <div className="mx-auto mb-[10px] flex w-full flex-col gap-[12px]">
            <Button handleClick={copyKeys} buttonType={'white'} text="Copy Keys" />
            <Button handleClick={handleSignUp} buttonType={'secondary'} text="Start Earning" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpSuccess;
