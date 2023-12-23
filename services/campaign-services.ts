'use client';

import { campaignContractId, issuanceManagementContract, localCoinAddress } from 'utils/constants';
import { decoderHelper } from './response-decoder';
var StellarSdk = require('stellar-sdk');

// var SorobanClient = require('soroban-client');
const serverUrl = 'https://soroban-testnet.stellar.org';

export const campaignServices = (() => {
  const accountToScVal = (account: string) => new StellarSdk.Address(account).toScVal();
  const numberToI128 = (value: number) =>
    new StellarSdk.nativeToScVal(value * 10 ** 7, { type: 'i128' });

  const numberToU32 = (value: number) => new StellarSdk.nativeToScVal(value, { type: 'u32' });
  const StringToScVal = (value: string) => new StellarSdk.nativeToScVal(value, { type: 'string' });

  const makeTransaction = async ({
    secretKey,
    parameterType,
    payload = '',
    contractId = campaignContractId
  }: any) => {
    try {
      debugger;
      const sourceKeypair = StellarSdk.Keypair.fromSecret(secretKey);
      const sourcePublicKey = sourceKeypair.publicKey();
      const server = new StellarSdk.SorobanRpc.Server(serverUrl, {
        allowHttp: true
      });
      const account = await server.getAccount(sourcePublicKey);

      const contract = new StellarSdk.Contract(contractId);
      const fee = 1000000;
      let transaction = new StellarSdk.TransactionBuilder(account, {
        fee,
        networkPassphrase: StellarSdk.Networks.TESTNET
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
        const txResponse = await server.getTransaction(response.hash);
        // console.log('pending');
        while (true) {
          try {
            const txResponse = await server.getTransaction(response.hash);

            if (txResponse.status === 'SUCCESS') {
              console.log({ txResponse });
              console.log({ ret: txResponse?.returnValue });

              console.log('Transaction is successful:', txResponse);
              // return txResponse.resultXdr.toXDR('base64');
              return decoderHelper(parameterType, txResponse);
            } else if (txResponse.status === 'NOT_FOUND') {
              console.log('Transaction not found. Retrying...');
              await new Promise((resolve) => setTimeout(resolve, 1000));
            } else {
              console.error('Transaction failed:', txResponse);
              return null;
            }
          } catch (error) {
            console.error('Error while checking transaction status:', error);
            return null;
          }
        }
      }
    } catch (error: any) {
      console.log(error, 'FRM THE ERROR');
      // return error;
      return Promise.reject(error);
    }
  };

  const getCampaigns = (secretKey: string, publicKey: string) => {
    // return makeTransaction({ secretKey, parameterType: 'get_campaigns_name' });
    return makeTransaction({
      secretKey,
      parameterType: 'get_creator_campaigns',
      payload: [accountToScVal(publicKey)]
    });
  };

  const createCampaigs = (data: any, secretKey: string, publicKey: string) => {
    console.log({ data });
    return makeTransaction({
      secretKey,
      parameterType: 'create_campaign',
      payload: [
        StringToScVal(data.name),
        StringToScVal(data.description),
        StringToScVal(data.participant),
        // numberToU32(parseFloat(data.participant)),
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

  const getTokenNameAddress = (secretKey: string) => {
    return makeTransaction({
      parameterType: 'get_token_name_address',
      contractId: issuanceManagementContract,
      secretKey
    });
  };

  const transfer_tokens_to_recipient = (secretKey: string, address: string, amount: string) => {
    return makeTransaction({
      parameterType: 'transfer_tokens_to_recipient',
      secretKey,
      payload: [StringToScVal(address), StringToScVal(amount + '')]
    });
  };

  return {
    getCampaigns: getCampaigns,
    createCampaigns: createCampaigs,
    getCampaignInfo,
    getTokenNameAddress: getTokenNameAddress,
    transfer_tokens_to_recipient
  };
})();
