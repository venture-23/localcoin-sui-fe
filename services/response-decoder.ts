import { toast } from 'react-toastify';

var SorobanClient = require('soroban-client');

interface ResponseType {
  returnValue?: {
    _value?: any[];
  };
}

const makeSingleObject = (data: any) => {
  return Object.assign({}, ...data);
};

const decodeContract = (value: any) => {
  return SorobanClient.StrKey.encodeContract(value);
};

const decoderHelper = (params: string, response: ResponseType) => {
  try {
    switch (params) {
      case 'get_campaigns_name':
        const campaignList = response?.returnValue?._value?.map((x: any) => ({
          contractId: decodeContract(x?._attributes?.key?._value?._value),
          title: x?._attributes?.val?._value?.toString()
        }));
        return campaignList;

      case 'get_campaign_info':
        console.log({ response });
        const allInfo = (response?.returnValue?._value || []).map(
          (eachValue: any, index: number) => ({
            [index === 0 ? 'no_of_recipients' : index === 1 ? 'name' : 'description']:
              eachValue?._value?.toString()
            // [eachValue?._value?.toString()]: eachValue?._value?.toString()
            // [eachValue?._value?.toString()]: eachValue?._value?.toString()
          })
        );
        console.log({ allInfo });
        const singleObject = makeSingleObject(allInfo);
        console.log({ singleObject });
        return singleObject;

      case 'get_token_name_address':
        const tokenData = (response?.returnValue?._value || []).map((eachValue: any) => ({
          name: eachValue?._attributes?.key?._value?.toString(),
          value: decodeContract(eachValue?._attributes?.val?._value?._value)
        }));
        console.log({ tokenData });
        return tokenData;

      default:
        return response.returnValue;
    }
  } catch (error: any) {
    toast.error('decode failed');
    throw new Error(error);
  }
};

export { decoderHelper };
