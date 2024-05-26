import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { CAMPAIGN_PACKAGE_ID, MERCHANT_REGISTRY, PACKAGE_ID, USDC_TYPE } from "utils/constants";

var StellarSdk = require('stellar-sdk');

// use getFullnodeUrl to define Devnet RPC location
  const rpcUrl = getFullnodeUrl('testnet');
  
  // create a client connected to devnet
  const client = new SuiClient({ url: rpcUrl });
 


// var SorobanClient = require('soroban-client');
const serverUrl = 'https://soroban-testnet.stellar.org';

export const campaignServices = (() => {
  const accountToScVal = (account: string) => new StellarSdk.Address(account).toScVal();
  const numberToI128 = (value: number) =>
    new StellarSdk.nativeToScVal(value * 10 ** 7, { type: 'i128' });

  const numberToU32 = (value: number) => new StellarSdk.nativeToScVal(value, { type: 'u32' });
  const StringToScVal = (value: string) => new StellarSdk.nativeToScVal(value, { type: 'string' });



  const getCreatorCampaigns = (secretKey: string, publicKey: string) => {
    // return makeTransaction({ secretKey, parameterType: 'get_campaigns_name' });
    // return makeTransaction({
    //   secretKey,
    //   parameterType: 'get_creator_campaigns',
    //   payload: [accountToScVal(publicKey)]
    // });
  };

  const getAllCampaigns = async () => {
    try {
      const txn = await client.getDynamicFields({
        parentId: CAMPAIGN_PACKAGE_ID
    });
    const result = txn.data;

    const objectIds = result.map(item => item.objectId);
    let campaignDetails;
    const campaigns = []
    console.log(objectIds, ':objects')
    for(const object of objectIds) {
      const response = await client.getObject({
        id: object,
        options : {
          showContent: true
        }
      })
      const data = response.data
      const res = data?.content

      campaignDetails = (res as any)?.fields;
      console.log(res, ':cam')
      campaigns.push({
          amount: campaignDetails.amount,
          campaign_id: campaignDetails?.id?.id,
          creator: campaignDetails.creator,
          location: campaignDetails.location,
          name: campaignDetails.name,
          description: campaignDetails.description,
          no_of_recipients: campaignDetails.no_of_recipients,
          recipient_balance: campaignDetails.recipient_balance.fields.contents.map((entry: any) => {
            return {
              paidAddress: entry.fields.key,
              value: entry.fields.value
            };
          })
      });


      console.log(campaigns, ':resOb')

      // campaignDetails = res?.
    }
    return campaigns
    } catch (error) {
      console.log(error)
      throw error
    }
    
    // return makeTransaction()
  };

  const getCampaignDetails = async (id: string) => {
    try {
      const allCampDetails = await getAllCampaigns()
      const campInfo = allCampDetails?.find((camp) => camp?.campaign_id === id)
      return campInfo
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const createCampaigs = (data: any, secretKey: string, publicKey: string) => {
    console.log({ data, secretKey, publicKey });
    // return makeTransaction({
    //   secretKey,
    //   publicKey,
    //   parameterType: 'create_campaign',
    //   payload: [
    //     StringToScVal(data.name),
    //     StringToScVal(data.description),
    //     // StringToScVal(data.participant),
    //     numberToU32(parseFloat(data.participant)),
    //     accountToScVal(data.tokenAddress),
    //     numberToI128(parseFloat(data.totalAmount)),
    //     accountToScVal(publicKey),
    //     StringToScVal(data.location)
    //   ]
    // });
  };

  const getCampaignInfo = (
    publicKey: string,
    contractId: string = 'CAYB5NVCDFFO3IYCHY77LPK2KAXJ7PNHIHPWQEUIM6G372MI7YKQS2VN'
  ) => {
    // return makeTransaction({
    //   parameterType: 'get_campaign_info',
    //   contractId,
    //   publicKey
    // });
  };

  const getTokenNameAddress = (address: string) => {
    
  };

  const getReceipientToken = async (address: string) => {
    try {
      console.log(address, ':address')
      const txn = await client.getOwnedObjects({
        owner: address,
      })
      const data = txn.data

      const obId = ''
      let balance = 0

      const objectIds = data.map(item => item.data?.objectId ?? null)
      for (const objectId of objectIds) {
        const txn2 = await client.getObject({
          id: `${objectId}`,
          options: {
            showContent: true
          }
        })
        console.log(txn2, ':balanceObLo')
        const content = txn2.data?.content;
        console.log(content)
        const type = content?.type;
        if(type === `0x2::token::Token<${PACKAGE_ID}::local_coin::LOCAL_COIN>`) {
          balance += Number(content?.fields?.balance)
        }

      }
      console.log(balance)
      if(balance === 0) {
        return balance
      } else {
        return balance / Math.pow(10, 6)
      }
      
    } catch (error) {
      console.log(error)
      throw error
    }
    // try {
    //   const txn = await client.getBalance({
    //     owner: address,
    //     coinType: `PACKAGE_ID::local_coin::LOCAL_COIN`
    //   })
    //   console.log(txn, ':balanceOb')
    //   // return txn.totalBalance
    //   return 0
    // } catch (error) {
    //   console.log(error)
    //   throw error
    // }
  };

  const getTokenObj = async (address: string) => {
    try {
      console.log(address, ':address')
      const txn = await client.getOwnedObjects({
        owner: address,
      })
      const data = txn.data

      let obId = ''

      const objectIds = data.map(item => item.data?.objectId ?? null)
      for (const objectId of objectIds) {
        const txn2 = await client.getObject({
          id: `${objectId}`,
          options: {
            showContent: true
          }
        })
        const content = txn2.data?.content;
        console.log(content)
        const type = content?.type;
        if(type === `0x2::token::Token<${PACKAGE_ID}::local_coin::LOCAL_COIN>`) {
          obId = objectId as string
          break;
        }

      }
      console.log(obId)
      return obId
    } catch (error) {
      console.log(error)
      throw error
    }
  };

  const transfer_tokens_to_recipient = (
    secretKey: string,
    address: string,
    amount: number,
    contractId: string
  ) => {
    console.log({
      secretKey,
      address,
      amount,
      contractId 
    })
    // return makeTransaction({
    //   parameterType: 'transfer_tokens_to_recipient',
    //   secretKey,
    //   contractId,
    //   payload: [accountToScVal(address), numberToI128(amount)]
    // });
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
    // return makeTransaction({
    //   parameterType: 'recipient_to_merchant_transfer',
    //   secretKey,
    //   contractId, //token id
    //   payload: [
    //     accountToScVal(senderAddress),
    //     accountToScVal(merchantAddress),
    //     numberToI128(amount)
    //   ]
    // });
  };

  const merchant_registration = (userInfo: any, data: any) => {
    try {
      console.log({ data }, 'merchant registration');
      // return makeTransaction({
      //   contractId: userRegistryContractId,
      //   parameterType: 'merchant_registration',
      //   secretKey: userInfo.secretKey,
      //   payload: [
      //     accountToScVal(userDetails?.address),
      //     StringToScVal(data.proprietor),
      //     StringToScVal(data.phone_no),
      //     StringToScVal(data.store_name),
      //     StringToScVal(data.location)
      //   ]
      // });
    } catch (error) {
      console.log(error, ':from 231');
    }
  };

  const verify_merchant = (data: any) => {
    // return makeTransaction({
    //   contractId: userRegistryContractId,
    //   parameterType: 'verify_merchant',
    //   secretKey: superAdminSecret,
    //   payload: [accountToScVal(data.publicKey)]
    // });
  };

  const get_merchant_associated = (data: any, tokenId: string) => {
    // return makeTransaction({
    //   contractId: issuanceManagementContract,
    //   parameterType: 'get_merchants_associated',
    //   secretKey: data.secretKey,
    //   // tokenAddress
    //   payload: [accountToScVal(tokenId)] //token_contract_id
    //   // payload: [accountToScVal('CB5VITTFVAVRIWZDJ2BITGU3NHE5UEEQWIJ6DJFGNPITHRZVY7EOVIOL')] //token_contract_id
    // });
  };

  const get_verified_merchants = async () => {
    try {
      const txn = await client.getDynamicFields({
        parentId: MERCHANT_REGISTRY
    });
    const result = txn.data;

    const objectIds = result.map(item => item.objectId);
    let merchantDetails;
    const merchants = []
    console.log(objectIds, ':objects')
    for(const object of objectIds) {
      const response = await client.getObject({
        id: object,
        options : {
          showContent: true
        }
      })
      const data = response.data
      const res = data?.content

      merchantDetails = (res as any)?.fields;
      console.log(res, ':merchant')
      // if(merchantDetails.verified_status === true) {
        merchants.push({
          store_id: merchantDetails?.id?.id,
          merchant_address: merchantDetails.merchant_addr,
          location: merchantDetails.location,
          store_name: merchantDetails.store_name,
          proprietor: merchantDetails.proprietor,
          phone_no: merchantDetails.phone_no,
          verification_status: merchantDetails.verified_status,
          
      });
      // }

      


      console.log(merchants, ':resOb')

      // campaignDetails = res?.
    }
    return merchants
    } catch (error) {
      console.log(error)
      throw error
    }
  };

  const get_merchant_info = async (storeId: string) => {
    try {
      const allMercInfo = await get_verified_merchants()
      const mercInfo = allMercInfo?.find((merc) => merc?.store_id === storeId)
      return mercInfo
    } catch (error) {
      console.log(error)
      throw error
    }
  };

  const request_campaign_settlement = (
    publicKey: string,
    secretKey: any,
    amount: any,
    tokenAddress: string
  ) => {
    console.log({ tokenAddress, secretKey, amount });
    // return makeTransaction({
    //   contractId: campaignContractId,
    //   parameterType: 'request_campaign_settlement',
    //   secretKey: secretKey,
    //   payload: [accountToScVal(publicKey), numberToI128(amount), accountToScVal(tokenAddress)]
    // });
  };

  const get_balance = async (address: string) => {
    try {
      const txn = await client.getBalance({
        owner: address,
        coinType: USDC_TYPE
      })
      console.log(txn, ':balanceOb')
      return txn.totalBalance
    } catch (error) {
      console.log(error)
      throw error
    }
  };

  const join_campaign = (
    username: string,
    address: string,
    userInfo: any,
    campaignAddress: string
  ) => {
    // return makeTransaction({
    //   secretKey: userInfo.secretKey,
    //   publicKey: userDetails?.address,
    //   contractId: campaignAddress,
    //   parameterType: 'join_campaign',
    //   payload: [StringToScVal(username), accountToScVal(userDetails?.address)]
    // });
  };

  const get_recipients_status = async (address: string, objId: string) => {
    try {
      console.log(objId, ':obj')
      const txn = await client.getDynamicFields({
        parentId: CAMPAIGN_PACKAGE_ID
    });
    const result = txn.data;

    const objectIds = result.map(item => item.objectId);
    const filterObjIds = objectIds.filter(item => item === objId)
    let campaignDetails;
    const recipients: any = []
    console.log(objectIds, ':objects')
    for(const object of filterObjIds) {
      const response = await client.getObject({
        id: object,
        options : {
          showContent: true
        }
      })
      const data = response.data
      const res = data?.content

      campaignDetails = (res as any)?.fields;
      console.log(res, ':cam')
      campaignDetails?.unverified_recipients?.fields?.contents?.forEach((entry: any) => {
        recipients.push({address: entry?.fields?.key, value: false, userName: entry?.fields?.value })
      })
      campaignDetails?.verified_recipients?.fields?.contents?.forEach((entry: any) => {
        recipients.push({address: entry?.fields?.key, value: true, userName: entry?.fields?.value})
      })
      // campaigns.push({
      //     unverified: campaignDetails?.unverified_recipients,
      //     verified: campaignDetails?.verified_recipients,
      // });


      console.log(recipients, ':resOb')

      // campaignDetails = res?.
    }
    return recipients
    } catch (error) {
      console.log(error)
      throw error
    }
  };

  const get_owner = (publicKey: string, contractId: string) => {
    // return makeTransaction({
    //   publicKey: publicKey,
    //   contractId: contractId,
    //   parameterType: 'get_owner'
    // });
  };

  const verify_recipients = (secretKey: string, contractId: string, participantNameList: any) => {
    console.log({participantNameList})
    // return makeTransaction({
    //   secretKey: secretKey,
    //   contractId: contractId,
    //   parameterType: 'verify_recipients',
    //   // payload: [StringToScVal(['jack'])]
    //   // payload: [StringToScVal(['jack', 'bob'])]
    //   payload: [StringToScVal(participantNameList)]
    // });
  };

  const end_campaign = (userInfo: any, contractId: string) => {
    // return makeTransaction({
    //   secretKey: userInfo.secretKey,
    //   contractId: campaignContractId,
    //   parameterType: 'end_campaign',
    //   payload: [accountToScVal(contractId), accountToScVal(userDetails?.address)]
    // });
  };

  const is_ended = (userInfo: any, contractId: string) => {
    // return makeTransaction({
    //   secretKey: userInfo.secretKey,
    //   contractId: contractId,
    //   parameterType: 'is_ended',
      
    // });
  }

  const  get_amount_received = (userAddress: any, contractId: string) => {
    
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
    is_ended,
    get_amount_received,
    getCampaignDetails,
    getTokenObj
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
