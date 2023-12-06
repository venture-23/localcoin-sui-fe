import Button from 'components/botton';

const GenerateKeyPairPage = ({ handleGenerateKey }: any) => {
  return (
    <>
      <div className=" rounded-lg bg-white p-10">
        <div className="mb-6">
          <h1 className="text-heading mb-6">Generate Keypair</h1>
          <p className="text-color max-w-sm text-lg">
            Clicking the button below will Generates a keypair associated with the stellar
            blockchain.
          </p>
        </div>

        <div className="grid  gap-4">
          <div onClick={() => handleGenerateKey()}>
            <Button text="Generate" />
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateKeyPairPage;
