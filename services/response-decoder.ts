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
      case 'get_campaigns':
        const campaignList = response?.returnValue?._value?.map((x: any) =>
          decodeContract(x?._value?._value)
        );
        return campaignList;

      case 'get_campaign_info':
        console.log({ response });
        const allInfo = (response?.returnValue?._value || []).map((eachValue: any) => ({
          [eachValue?._attributes?.key?._value?.toString()]:
            eachValue?._attributes?.val?._value?.toString()
        }));
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
