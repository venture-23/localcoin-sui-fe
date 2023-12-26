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

const decodePublicKey = (value: any) => {
  return StellarSdk.StrKey.encodeEd25519PublicKey(value) || '';
};

const decodei128 = (data: any) => {
  const bigInt = require('big-integer');
  const hiValue = bigInt(data?._attributes?.hi?._value);
  const loValue = bigInt(data?._attributes?.lo?._value);

  const combinedValue = hiValue.shiftLeft(64).or(loValue);
  const stringValue = combinedValue.toString();
  const decodedValue = stringValue.replace(/0{7}$/, '');
  return decodedValue;
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
        const campaignList: any[] | undefined = response?.returnValue?._value?.map((x: any) =>
          x._value.map((eachInsideValue: any) => {
            const key = eachInsideValue?._attributes?.key?._value?.toString() || '';
            const val = eachInsideValue?._attributes?.val?._value;

            if (key === 'info') {
              return val?.map((y: any) => ({
                [y?._attributes?.key?._value?.toString() || '']:
                  y?._attributes?.val?._value.toString() || ''
              }));
            } else if (key === 'token_minted') {
              return { [key]: decodei128(val) || '' };
            } else {
              return { [key]: (val?._value && decodeContract(val?._value)) || '' };
            }
          })
        );

        const [campaignObj, detailsArray, tokenObj, tokenMintedObj] = campaignList?.[0] || [];
        const { campaign } = campaignObj;
        const { description, name, no_of_recipients } = Object.assign({}, ...detailsArray);

        // Create the desired output object
        const transformedOutput = {
          campaign,
          description,
          name,
          no_of_recipients,
          token: tokenObj?.token || '',
          token_minted: tokenMintedObj?.token_minted || ''
        };

        // Create a new array with the transformed object
        const output = [transformedOutput];
        return output;
      case 'get_campaign_info':
        const allInfo = (response?.returnValue?._value || []).map((eachValue: any) => ({
          [eachValue?._attributes?.key?._value?.toString()]:
            eachValue?._attributes?.key?._value?.toString() === 'creator'
              ? decodePublicKey(eachValue?._attributes?.val?._value?._value?._value)
              : eachValue?._attributes?.key?._value?.toString() === 'token_address'
              ? decodeContract(eachValue?._attributes?.val?._value?._value)
              : eachValue?._attributes?.val?._value?.toString()
        }));

        const singleObject = makeSingleObject(allInfo);
        return singleObject;

      case 'get_token_name_address':
        const tokenData = (response?.returnValue?._value || []).map((eachValue: any) => ({
          name: eachValue?._attributes?.key?._value?.toString(),
          value: decodeContract(eachValue?._attributes?.val?._value?._value)
        }));
        return tokenData;

      case 'get_balance_of_batch':
        const tokenList = (response?.returnValue?._value || []).map((x) => {
          const name = x._attributes?.key?._value?.toString();
          const test = (x._attributes?.val?._value || []).reduce(
            (result: any, eachVal: any) => {
              if (eachVal._arm === 'i128') {
                result.amount = decodei128(eachVal?._value);
              } else {
                result.contractToken = decodeContract(eachVal?._value?._value);
              }
              return result;
            },
            { name }
          );
          return test;
        });
        console.log(tokenList, '1231231223121321');
        return tokenList;

      case 'merchant_registration':
        toast.success('Registered, Waiting for verified account');
        return response.returnValue?._value;
      case 'verify_merchant':
        toast.success('Verified Mechant from admin, Successfully');
        return response.returnValue?._value;
      case 'get_merchants_associated':
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
    toast.error(`decode failed from ${params}`);
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
