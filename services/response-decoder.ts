var SorobanClient = require('soroban-client');

interface ResponseType {
  returnValue?: {
    _value?: any[];
  };
}

const decoderHelper = (params: string, response: ResponseType) => {
  switch (params) {
    case 'get_campaigns':
      const campaignList = response?.returnValue?._value?.map((x: any) =>
        SorobanClient.StrKey.encodeContract(x?._value?._value)
      );
      return campaignList;

    case 'get_campaign_info':
      const allInfo = (response?.returnValue?._value || []).map((eachValue: any) => ({
        [eachValue?._attributes?.key?._value?.toString()]:
          eachValue?._attributes?.val?._value?.toString()
      }));

      const singleObject = Object.assign({}, ...allInfo);
      return singleObject;

    default:
      return response.returnValue;
  }
};

export { decoderHelper };
