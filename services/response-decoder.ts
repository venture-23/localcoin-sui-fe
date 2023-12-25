import { toast } from 'react-toastify';

// var SorobanClient = require('soroban-client');
var StellarSdk = require('stellar-sdk');

interface ResponseType {
  returnValue?: {
    _value?: any[];
  };
}

const makeSingleObject = (data: any) => {
  if (data) return Object.assign({}, ...data);
  return {};
};

const decodeContract = (value: any) => {
  return StellarSdk.StrKey.encodeContract(value);
};

const decoderHelper = (params: string, response: ResponseType) => {
  try {
    switch (params) {
      case 'get_campaigns':
        const allCampaignList = (response?.returnValue?._value || []).map((eachValue: any) => ({
          id: decodeContract(eachValue?._value?._value),
          campaign: decodeContract(eachValue?._value?._value)
        }));
        return allCampaignList;
      case 'get_creator_campaigns':
        const campaignList: any = response?.returnValue?._value?.map((x: any) => {
          return x._value.map((eachInsideValue: any) => {
            if (eachInsideValue?._attributes?.key?._value?.toString() !== 'info') {
              return {
                [eachInsideValue?._attributes?.key?._value?.toString() || '']:
                  (eachInsideValue?._attributes?.val?._value?._value &&
                    decodeContract(eachInsideValue?._attributes?.val?._value?._value)) ||
                  ''
              };
            } else {
              return eachInsideValue?._attributes?.val?._value.map((y: any, index: number) => {
                return {
                  [index === 0 ? 'name' : index === 1 ? 'discription' : 'no_of_recipients']:
                    y._value.toString()
                };
              });
            }
          });
        });
        const flatArray = campaignList.map((item: any) => {
          const [campaignObj, detailsArray, tokenObj, tokenMintedObj] = item;
          const result = {
            id: campaignObj?.campaign,
            campaign: campaignObj?.campaign,
            name: detailsArray[0]?.name,
            description: detailsArray[1]?.discription,
            no_of_recipients: detailsArray[2]?.no_of_recipients,
            token: tokenObj?.token,
            token_minted: tokenMintedObj?.token_minted
          };

          return result;
        });
        return flatArray || [];
      case 'get_campaign_info':
        const allInfo = (response?.returnValue?._value || []).map(
          (eachValue: any, index: number) => ({
            [index === 0 ? 'no_of_recipients' : index === 1 ? 'name' : 'description']:
              eachValue?._value?.toString()
            // [eachValue?._value?.toString()]: eachValue?._value?.toString()
            // [eachValue?._value?.toString()]: eachValue?._value?.toString()
          })
        );
        const singleObject = makeSingleObject(allInfo);
        return singleObject;

      case 'get_token_name_address':
        const tokenData = (response?.returnValue?._value || []).map((eachValue: any) => ({
          name: eachValue?._attributes?.key?._value?.toString(),
          value: decodeContract(eachValue?._attributes?.val?._value?._value)
        }));
        return tokenData;

      case 'get_balance_of_batch':
        const tokenList = (response?.returnValue?._value || []).map((x) => ({
          name: x._attributes?.key?._value?.toString()
        }));
        // const res: any = (response?.returnValue?._value || []).map((entry, i) =>
        //   this.scValToNative(entry, fields[i].type())
        // );
        // console.log(tokenList, res);
        return tokenList;

      case 'merchant_registration':
        toast.success('Registered, Waiting for verified account');
        return response.returnValue?._value;
      case 'verify_merchant':
        toast.success('Verified Mechant from admin, Successfully');
        return response.returnValue?._value;
      case 'get_merchants_assocoated':
        const merchantAssco = (response?.returnValue?._value || []).map(
          (eachValue: any) =>
            StellarSdk.StrKey.encodeEd25519PublicKey(eachValue?._value?._value?._value) || ''
        );
        return merchantAssco;
      case 'get_merchant_info':
        const merchantInfo = (response?.returnValue?._value || []).map((eachValue: any) => ({
          [eachValue?._attributes?.key?._value?.toString()]:
            eachValue?._attributes?.val?._value?.toString()
        }));
        if (merchantInfo?.length === 0) {
          toast.error(`Merchant Doesn't exist, select another merchan from response-decoder`);
        }
        console.log({ merchantInfo }, '111');
        return makeSingleObject(merchantInfo);
      default:
        return response.returnValue;
    }
  } catch (error: any) {
    toast.error('decode failed');
    throw new Error(error);
  }
};

export { decoderHelper };

/*  server.simulateTransaction(transaction).then((sim: any) => {
        console.log({ sim });
        console.log('cost:', sim.cost);
        console.log('result:', sim.result);
        console.log('error:', sim.error);
        console.log('latestLedger:', sim.latestLedger);
      }); */
