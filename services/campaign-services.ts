'use client';
var SorobanClient = require('soroban-client');
const serverUrl = 'https://soroban-testnet.stellar.org';

const localCoinAddress = 'CC4CBVODKWPVRRITF5ABX3JW664MCPV464QE5DUBYMH57XHSZKEZUILT';

export const campaignServices = (() => {
  const accountToScVal = (account: string) => new SorobanClient.Address(account).toScVal();
  const numberToI128 = (value: number) =>
    new SorobanClient.nativeToScVal(value * 10 ** 7, { type: 'i128' });

  const numberToU32 = (value: number) => new SorobanClient.nativeToScVal(value, { type: 'u32' });
  const StringToScVal = (value: string) =>
    new SorobanClient.nativeToScVal(value, { type: 'string' });

  const makeTransaction = async ({
    // secretKey = 'SDA3X6LFDLN5SL6KK3CZ4QUBRBWAAUSOL7YOI25TQMMMYYBDFDRY2H7W',
    secretKey,
    parameterType,
    payload = ''
  }: any) => {
    try {
      debugger;
      const sourceKeypair = SorobanClient.Keypair.fromSecret(secretKey);
      const sourcePublicKey = sourceKeypair.publicKey();
      const contractId = 'CAPWEGXEOWLOMEJRDST4XDNAGUX6YNWXWASYV7B7QTKN34OKTWVOKYUU';
      const server = new SorobanClient.Server(serverUrl, {
        allowHttp: true
      });
      const account = await server.getAccount(sourcePublicKey);

      const contract = new SorobanClient.Contract(contractId);
      const fee = 1000000;
      let transaction = new SorobanClient.TransactionBuilder(account, {
        fee,
        networkPassphrase: SorobanClient.Networks.TESTNET
      })
        .addOperation(contract.call(parameterType, ...((payload && payload) || [])))
        .setTimeout(30)
        .build();

      transaction = await server.prepareTransaction(transaction);
      transaction.sign(sourceKeypair);
      const response = await server.sendTransaction(transaction);
      const SendTxStatus = {
        Pending: 'PENDING',
        Duplicate: 'DUPLICATE',
        Retry: 'TRY_AGAIN_LATER',
        Error: 'ERROR'
      };
      if (response.status === SendTxStatus.Pending) {
        console.log('pending');
        let txResponse = await server.getTransaction(response.hash);
        while (txResponse?.status === SorobanClient?.SorobanRpc?.GetTransactionStatus?.NOT_FOUND) {
          txResponse = await server.getTransaction(response.hash);
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        if (txResponse?.status === SorobanClient?.SorobanRpc?.GetTransactionStatus?.SUCCESS) {
          return decoderHelper(parameterType, txResponse);
        }
      }
    } catch (error: any) {
      console.log(error, 'FRM THE ERROR');
      // return error;
      return Promise.reject(error);
    }
  };

  const getCampaigns = (secretKey: string) => {
    return makeTransaction({ secretKey, parameterType: 'get_campaigns' });
  };

  const createCampaigs = (data: any, secretKey: string, publicKey: string) => {
    return makeTransaction({
      secretKey,
      parameterType: 'create_campaign',
      payload: [
        StringToScVal(data.name),
        StringToScVal(data.description),
        numberToU32(parseFloat(data.recipients)),
        accountToScVal(localCoinAddress),
        numberToI128(parseFloat(data.totalAmount)),
        // accountToScVal('GCSEKCSARTFPCCY2ZMC5GPUBYD2DJBTVFUXFO5O3R2Q72QTU4BDPUXXY')
        accountToScVal(publicKey)
      ]
    });
  };

  return {
    getCampaigns: getCampaigns,
    createCampaigns: createCampaigs
  };
})();

const decoderHelper = (params: any, response: any) => {
  switch (params) {
    case 'get_campaigns':
      console.log(response.returnValue, 'from the get_campaigns');
      const campaignList = response.returnValue?._value?.map((x: any) =>
        SorobanClient.StrKey.encodeEd25519PublicKey(x?._value?._value)
      );
      return campaignList;

    default:
      return response.returnValue;
  }
};
