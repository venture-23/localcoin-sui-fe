const GenerateKeyPairPage = ({ handleGenerateKey }: any) => {
  return (
    <>
      <div className="container mx-auto">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold">Generate Keypair</h1>
          <p className="max-w-sm text-gray-700">
            Clicking this button will generates a keypair associated with the Stellar blockchain.
          </p>
        </div>

        <div className="grid  gap-4">
          <button type="button" onClick={() => handleGenerateKey()} className=" button-primary">
            Generate
          </button>
        </div>
      </div>
    </>
  );
};

export default GenerateKeyPairPage;
