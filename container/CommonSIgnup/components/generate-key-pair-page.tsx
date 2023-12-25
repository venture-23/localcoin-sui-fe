import { KeyIcon } from '@heroicons/react/20/solid';
import Button from 'components/botton';
import Image from 'next/image';

const GenerateKeyPairPage = ({ handleGenerateKey }: any) => {
  return (
    <>
      <div className="rounded-lg bg-white p-6 ">
        <div className="mb-6">
          {/* <div className="flex justify-center">
            <Image src={'/generateQR.png'} width={250} height={250} alt="genetate image" />
          </div> */}
          <h1 className="mb-2 text-2xl font-bold">Generate Keypair</h1>
          <p className="max-w-sm font-medium text-textSecondary">
            Clicking the button below will Generates a keypair associated with the stellar
            blockchain.
          </p>
        </div>

        <div className="grid gap-4">
          <div onClick={() => handleGenerateKey()}>
            <Button text="Generate" buttonIcon={<KeyIcon width={20} height={20} />} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateKeyPairPage;