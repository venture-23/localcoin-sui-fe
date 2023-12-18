import Button from 'components/botton';

const GenerateKeyPairPage = ({ handleGenerateKey }: any) => {
  return (
    <>
      <div className="rounded-lg bg-white p-6 ">
        <div className="mb-6">
          <div>Image here</div>
          <h1 className="mb-2 text-2xl font-bold">Generate Keypair</h1>
          <p className="max-w-sm text-sm font-medium text-textSecondary">
            Clicking the button below will Generates a keypair associated with the stellar
            blockchain.
          </p>
        </div>

        <div className="grid gap-4">
          <div onClick={() => handleGenerateKey()}>
            <Button text="Generate" />
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateKeyPairPage;
