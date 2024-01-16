import { toast } from 'react-toastify';
import {
  balanceContractId,
  campaignContractId,
  issuanceManagementContract,
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
    publicKey,
    parameterType,
    payload = '',
    contractId = campaignContractId
  }: any) => {
    try {
      debugger;
      let sourcePublicKey: string = '';
      let sourceKeypair: any = '';
      if (secretKey) {
        sourceKeypair = StellarSdk.Keypair.fromSecret(secretKey);
        sourcePublicKey = sourceKeypair.publicKey();
      } else {
        sourcePublicKey = publicKey;
      }
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
      if (
        ![
          'create_campaign',
          'transfer_tokens_to_recipient',
          'recipient_to_merchant_transfer',
          'merchant_registration',
          'verify_merchant',
          'request_campaign_settlement',
          'join_campaign',
          'verify_recipients',
          'end_campaign'
        ].includes(parameterType)
      ) {
        return server.simulateTransaction(transaction).then((sim: any) => {
          console.log({ sim: sim.result?.retval, parameterType });
          return decoderHelper(parameterType, { returnValue: sim.result?.retval });
        });
      } else {
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
                console.log('Transaction is successful:', txResponse, parameterType);
                // return txResponse.resultXdr.toXDR('base64');
                return decoderHelper(parameterType, txResponse);
              } else if (txResponse.status === 'NOT_FOUND') {
                console.log('Transaction not found. Retrying...', parameterType);
                await new Promise((resolve) => setTimeout(resolve, 1000));
              } else {
                console.log('error');
                toast.error(`failed while performing ${parameterType}`);
                return null;
              }
            } catch (error) {
              console.error('Error while checking transaction status:', error);
              return null;
            }
          }
        }
      }
    } catch (error: any) {
      console.log(error, `FRM THE ERROR from ${parameterType}`);
      toast.error(`FRM THE ERROR from ${parameterType} `);
      // toast.error(`FRM THE ERROR from ${parameterType} ${JSON.stringify(error, null, 2)} `, {
      //   autoClose: false
      // });
      // return error;
      return Promise.reject(error);
    }
  };

  const getCreatorCampaigns = (secretKey: string, publicKey: string) => {
    // return makeTransaction({ secretKey, parameterType: 'get_campaigns_name' });
    return makeTransaction({
      secretKey,
      parameterType: 'get_creator_campaigns',
      payload: [accountToScVal(publicKey)]
    });
  };

  const getAllCampaigns = (publicKey: string) => {
    return makeTransaction({
      parameterType: 'get_campaigns_name',
      publicKey
    });
  };

  const createCampaigs = (data: any, secretKey: string, publicKey: string) => {
    console.log({ data, secretKey, publicKey });
    return makeTransaction({
      secretKey,
      publicKey,
      parameterType: 'create_campaign',
      payload: [
        StringToScVal(data.name),
        StringToScVal(data.description),
        // StringToScVal(data.participant),
        numberToU32(parseFloat(data.participant)),
        accountToScVal(data.tokenAddress),
        numberToI128(parseFloat(data.totalAmount)),
        accountToScVal(publicKey),
        StringToScVal(data.location)
      ]
    });
  };

  const getCampaignInfo = (
    publicKey: string,
    contractId: string = 'CAYB5NVCDFFO3IYCHY77LPK2KAXJ7PNHIHPWQEUIM6G372MI7YKQS2VN'
  ) => {
    return makeTransaction({
      parameterType: 'get_campaign_info',
      contractId,
      publicKey
    });
  };

  const getTokenNameAddress = (publicKey: string) => {
    return makeTransaction({
      parameterType: 'get_token_name_address',
      contractId: issuanceManagementContract,
      publicKey
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
    console.log({
      amount,
      contractId,
      merchantAddress,
      senderAddress
    });
    return makeTransaction({
      parameterType: 'recipient_to_merchant_transfer',
      secretKey,
      contractId, //token id
      payload: [
        accountToScVal(senderAddress),
        accountToScVal(merchantAddress),
        numberToI128(amount)
      ]
    });
  };

  const merchant_registration = (data: any) => {
    try {
      console.log({ data }, 'merchant registration');
      return makeTransaction({
        contractId: userRegistryContractId,
        parameterType: 'merchant_registration',
        secretKey: data.secretKey,
        payload: [
          accountToScVal(data.publicKey),
          StringToScVal(data.proprietor),
          StringToScVal(data.phone_no),
          StringToScVal(data.store_name),
          StringToScVal(data.location || 'pokhara')
        ]
      });
    } catch (error) {
      console.log(error, ':from 231');
    }
  };

  const verify_merchant = (data: any) => {
    return makeTransaction({
      contractId: userRegistryContractId,
      parameterType: 'verify_merchant',
      secretKey: superAdminSecret,
      payload: [accountToScVal(data.publicKey)]
    });
  };

  const get_merchant_associated = (data: any, tokenId: string) => {
    return makeTransaction({
      contractId: issuanceManagementContract,
      parameterType: 'get_merchants_associated',
      secretKey: data.secretKey,
      // tokenAddress
      payload: [accountToScVal(tokenId)] //token_contract_id
      // payload: [accountToScVal('CB5VITTFVAVRIWZDJ2BITGU3NHE5UEEQWIJ6DJFGNPITHRZVY7EOVIOL')] //token_contract_id
    });
  };

  const get_verified_merchants = (publicKey: any) => {
    return makeTransaction({
      contractId: userRegistryContractId,
      parameterType: 'get_verified_merchants',
      publicKey
    });
  };

  const get_merchant_info = (publicKey: any, merchantAddress: string) => {
    console.log({ merchantAddress });
    return makeTransaction({
      contractId: userRegistryContractId, //token_contract_id
      parameterType: 'get_merchant_info',
      publicKey,
      payload: [accountToScVal(merchantAddress)]
    });
  };

  const request_campaign_settlement = (
    publicKey: string,
    secretKey: any,
    amount: any,
    tokenAddress: string
  ) => {
    console.log({ tokenAddress, secretKey, amount });
    return makeTransaction({
      contractId: campaignContractId,
      parameterType: 'request_campaign_settlement',
      secretKey: secretKey,
      payload: [accountToScVal(publicKey), numberToI128(amount), accountToScVal(tokenAddress)]
    });
  };

  const get_balance = (userInfo: any) => {
    return makeTransaction({
      secretKey: userInfo?.secretKey,
      contractId: balanceContractId,
      publicKey: userInfo?.publicKey,
      parameterType: 'balance',
      payload: [accountToScVal(userInfo?.publicKey)]
    });
  };

  const join_campaign = (
    username: string,
    address: string,
    userInfo: any,
    campaignAddress: string
  ) => {
    return makeTransaction({
      secretKey: userInfo.secretKey,
      publicKey: userInfo.publicKey,
      contractId: campaignAddress,
      parameterType: 'join_campaign',
      payload: [StringToScVal(username), accountToScVal(userInfo.publicKey)]
    });
  };

  const get_recipients_status = (userInfo: any) => {
    return makeTransaction({
      publicKey: userInfo.publicKey,
      contractId: userInfo.campaignAddress,
      parameterType: 'get_recipients_status'
    });
  };

  const get_owner = (publicKey: string, contractId: string) => {
    return makeTransaction({
      publicKey: publicKey,
      contractId: contractId,
      parameterType: 'get_owner'
    });
  };

  const verify_recipients = (secretKey: string, contractId: string, participantNameList: any) => {
    console.log({participantNameList})
    return makeTransaction({
      secretKey: secretKey,
      contractId: contractId,
      parameterType: 'verify_recipients',
      // payload: [StringToScVal(['jack'])]
      // payload: [StringToScVal(['jack', 'bob'])]
      payload: [StringToScVal(participantNameList)]
    });
  };

  const end_campaign = (userInfo: any, contractId: string) => {
    return makeTransaction({
      secretKey: userInfo.secretKey,
      contractId: campaignContractId,
      parameterType: 'end_campaign',
      payload: [accountToScVal(contractId), accountToScVal(userInfo.publicKey)]
    });
  };

  const is_ended = (userInfo: any, contractId: string) => {
    return makeTransaction({
      secretKey: userInfo.secretKey,
      contractId: contractId,
      parameterType: 'is_ended',
    });
  }

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
    verify_merchant,
    get_merchant_associated,
    get_merchant_info,
    request_campaign_settlement,
    get_user_balance: get_balance,
    get_verified_merchants,
    join_campaign,
    get_recipients_status,
    get_owner,
    verify_recipients,
    end_campaign,
    is_ended
  };
})();

/* 
{
    "username": "manish",
    "address": "GAVBJZNE4NKI7NMZAGD7RA5SIHBSZDSGUDCV2UDQHGUHGN4UIWAJUHPZ",
    "userInfo": {
        "storeName": "",
        "proprietaryName": "",
        "phoneNumber": "",
        "location": "",
        "secretKey": "SBWPALRGE724TRTJTCH353EWC67ASGY3PV47SHCHM4632Y7PVV3SWSEO",
        "publicKey": "GAVBJZNE4NKI7NMZAGD7RA5SIHBSZDSGUDCV2UDQHGUHGN4UIWAJUHPZ"
    },
    "campaignAddress": "CALTR26TIUXUGMEKYTIUSPRZ7LW3BMV2MF7J7SJB7K7ZQ6OGI2ZA5ZTQ"
}

*/
