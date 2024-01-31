import Button from 'components/botton';

const GenerateKeyPairPage = ({ handleGenerateKey }: any) => {
  return (
    <>
      <div className="generate-container bg-[#D5D5D5]">
        <div className='container h-[calc(100vh_-_65px)] pt-[64px] mx-auto flex flex-col justify-between'>
          <div className="mb-6">
          {/* <div className="flex justify-center">
            <Image src={'/generateQR.png'} width={250} height={250} alt="genetate image" />
          </div> */}
          <h1 className="mb-2 text-3xl font-[Inter] font-bold">Generate Keypair</h1>
          <p className="max-w-sm font-normal text-base">
          Clicking “Continue” will Generates a key pair associated with the stellar blockchain.
          </p>
          </div>

          <div className="grid gap-4">
          <div onClick={() => handleGenerateKey()}>
            <Button text="Continue"/>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateKeyPairPage;
