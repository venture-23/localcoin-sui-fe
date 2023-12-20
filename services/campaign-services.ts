'use client';

import { campaignContractId, issuanceManagementContract } from 'utils/constants';
import { decoderHelper } from './response-decoder';

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
    secretKey,
    parameterType,
    payload = '',
    contractId = campaignContractId
  }: any) => {
    try {
      const sourceKeypair = SorobanClient.Keypair.fromSecret(secretKey);
      const sourcePublicKey = sourceKeypair.publicKey();
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

      /* 
       'create_campaign',
          ...[
            StringToScVal('TEST'),
            StringToScVal('THIS IS DESCRIPTION'),
            numberToU32(1),
            accountToScVal('CC4CBVODKWPVRRITF5ABX3JW664MCPV464QE5DUBYMH57XHSZKEZUILT'),
            numberToI128(1),
            accountToScVal('GCSEKCSARTFPCCY2ZMC5GPUBYD2DJBTVFUXFO5O3R2Q72QTU4BDPUXXY')
          ] 
      
      */
      payload: [
        StringToScVal(data.name),
        StringToScVal(data.description),
        numberToU32(parseFloat(data.recipients)),
        accountToScVal(localCoinAddress),
        numberToI128(parseFloat(data.totalAmount)),
        accountToScVal(publicKey)
      ]
    });
  };

  const getCampaignInfo = (
    secretKey: string,
    contractId: string = 'CAYB5NVCDFFO3IYCHY77LPK2KAXJ7PNHIHPWQEUIM6G372MI7YKQS2VN'
  ) => {
    return makeTransaction({
      parameterType: 'get_campaign_info',
      contractId,
      secretKey
    });
  };

  const geTokenNameAddress = (secretKey: string) => {
    return makeTransaction({
      parameterType: 'get_token_name_address',
      contractId: issuanceManagementContract,
      secretKey
    });
  };

  return {
    getCampaigns: getCampaigns,
    createCampaigns: createCampaigs,
    getCampaignInfo,
    geTokenNameAddress: geTokenNameAddress
  };
})();
