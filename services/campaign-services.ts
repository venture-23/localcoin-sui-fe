'use client';

import { toast } from 'react-toastify';
import {
  campaignContractId,
  issuanceManagementContract,
  localCoinAddress,
  superAdminSecret,
  userRegistryContractId
} from 'utils/constants';
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
              toast.error(`failed while performing ${parameterType}`);
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

  const getCreatorCampaigns = (secretKey: string, publicKey: string) => {
    console.log({ secretKey, publicKey });
    // return makeTransaction({ secretKey, parameterType: 'get_campaigns_name' });
    return makeTransaction({
      secretKey,
      parameterType: 'get_creator_campaigns',
      payload: [accountToScVal(publicKey)]
    });
  };

  const getAllCampaigns = (secretKey: string) => {
    return makeTransaction({
      secretKey,
      parameterType: 'get_campaigns'
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

  const getReceipientToken = (secretKey: string, publicKey: string) => {
    return makeTransaction({
      parameterType: 'get_balance_of_batch',
      contractId: issuanceManagementContract,
      secretKey,
      payload: [accountToScVal(publicKey)]
    });
  };

  const transfer_tokens_to_recipient = (
    secretKey: string,
    address: string,
    amount: number,
    contractId: string
  ) => {
    return makeTransaction({
      parameterType: 'transfer_tokens_to_recipient',
      secretKey,
      contractId,
      payload: [accountToScVal(address), numberToI128(amount)]
    });
  };

  const transfer_to_merchant = (
    secretKey: string,
    amount: number,
    contractId: string,
    merchantAddress: string,
    senderAddress: string
  ) => {
    /* 
    need to send  token id
    const contractId = 'CB5VITTFVAVRIWZDJ2BITGU3NHE5UEEQWIJ6DJFGNPITHRZVY7EOVIOL';
    */
    return makeTransaction({
      parameterType: 'recipient_to_merchant_transfer',
      secretKey,
      contractId,
      payload: [
        accountToScVal(senderAddress),
        accountToScVal(merchantAddress),
        numberToI128(amount)
      ]
    });
  };

  const merchant_registration = (data: any) => {
    console.log('yes i am from merchant registration');
    return makeTransaction({
      contractId: userRegistryContractId,
      parameterType: 'merchant_registration',
      secretKey: data.secretKey,
      payload: [
        accountToScVal(data.publicKey),
        StringToScVal(data.proprietaryName),
        StringToScVal(data.phoneNumber),
        StringToScVal(data.storeName),
        StringToScVal(data.location)
      ]
    });
  };

  const verify_merchant = (data: any) => {
    console.log('yes i am from merchant verify');
    return makeTransaction({
      contractId: userRegistryContractId,
      parameterType: 'verify_merchant',
      secretKey: superAdminSecret,
      payload: [accountToScVal(data.publicKey)]
    });
  };

  return {
    getCreatorCampaigns: getCreatorCampaigns,
    getAllCampaigns,
    createCampaigns: createCampaigs,
    getCampaignInfo,
    getTokenNameAddress: getTokenNameAddress,
    transfer_tokens_to_recipient,
    getReceipientToken,
    transfer_tokens_from_recipient_to_merchant: transfer_to_merchant,
    merchant_registration,
    verify_merchant
  };
})();
