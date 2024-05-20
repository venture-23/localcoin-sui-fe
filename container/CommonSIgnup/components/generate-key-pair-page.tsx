import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { ConnectButton, ErrorCode } from '@suiet/wallet-kit';


import Link from 'next/link';

const GenerateKeyPairPage = ({ handleGenerateKey }: any) => {

  return (
    <>
      <div className="generate-container bg-[#D5D5D5]">
        <div className="container pl-[14px] mb-[6px] flex items-center pt-10">
              <Link className='flex items-center gap-[6px]' href={'/'}>
                <ChevronLeftIcon width={16} height={16} />
                <span className='text-[12px] font-normal'>Back</span>
              </Link>    
        </div>
        <div className='container h-[calc(100vh_-_75px)] pt-[10px] mx-auto flex flex-col justify-between'>
          <div className="mb-6">
          {/* <div className="flex justify-center">
            <Image src={'/generateQR.png'} width={250} height={250} alt="genetate image" />
          </div> */}
          <h1 className="mb-2 text-3xl font-[Inter] font-bold">Login With SUI Wallet</h1>
          <p className="max-w-sm font-normal text-base">
          Clicking “Continue” will Generates a key pair associated with the sui blockchain.
          </p>
          </div>

          <div className="grid gap-4">
          {/* <div onClick={() => setShowModal(true)}> */}
          <ConnectButton
              style={{ width: '100%' }}
              
              onConnectError={(error) => {
                 if (error.code === ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED) {
                   console.warn('user rejected the connection to ' + error.details?.wallet);
                 } else {
                   console.warn('unknown connect error: ', error);
                 }
            }}
          >
            Connect Wallet
          </ConnectButton>
            
            {/* <Button text="Continue"/> */}
          {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateKeyPairPage;
