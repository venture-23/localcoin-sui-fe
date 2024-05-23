import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { campaignServices } from 'services/campaign-services';
import { useMyContext } from './useMyContext';

export function useMerchant({
  merchantAddress = '',
  verify_merchant = false,
  data = {},
  tokenId = ''
}: any) {
  const { userInfo, setShowPinScreen, requiredAuthentication } = useMyContext();
  const [fetch_merchant_info, setFetch_merchant_info] = useState(false);
  const [isSettledSuccess, setisSettledSuccess] = useState(false);
  const get_merchant_info = useQuery({
    queryKey: [`get_merchant_info`],
    enabled: fetch_merchant_info,
    // cacheTime: Infinity,
    retry: 3,
    refetchOnWindowFocus: false,
    retryDelay: 3000,
    queryFn: async () => {
      const response_merchant_assoc = await campaignServices.get_merchant_associated(
        userInfo,
        tokenId
      );
      const merchantInfo = await campaignServices.get_merchant_info(
        userInfo.secretKey,
        merchantAddress
      );
      if (merchantInfo?.error || merchantInfo?.response_merchant_assoc) {
        toast.error('errored while multiple api hitting');
        throw new Error(merchantInfo.error || 'Something went wrong');
      }
      return { merchantInfo, response_merchant_assoc };
    },
    onError: (error: any) => {
      console.log('campaign status error', JSON.stringify(error, null, 2));
      toast.error('Error While getting campaign list');
    }
  });

  const campaign_settlement = useQuery({
    queryKey: [`campaign_settlement`],
    enabled: false,
    // cacheTime: Infinity,
    retry: 0,
    refetchOnWindowFocus: false,
    retryDelay: 3000,
    queryFn: async () => {
      setisSettledSuccess(false);
      const response = await campaignServices.request_campaign_settlement(
        userDetails?.address,
        userInfo.secretKey,
        parseFloat(data.amount),
        data.tokenId
      );

      if (response?.error) throw new Error(response.error || 'Something went wrong');
      // return response;
      setisSettledSuccess(true);
      return { success: 'Completed' };
    },
    onError: (error: any) => {
      toast.error('Error While campaign_settlement');
    }
  });

  const merchantRegistrationInfo = useQuery({
    queryKey: [`merchant-registration`],
    enabled: false,
    // cacheTime: Infinity,
    retry: 0,
    refetchOnWindowFocus: false,
    retryDelay: 3000,
    queryFn: async () => {
      // const test = async () => {
        console.log(data, ':data')
        const response = await campaignServices.merchant_registration(userInfo, data);
        console.log(response, 'Merhcant')
        if (response?.error) throw new Error(response.error || 'Something went wrong');
        return response;
    },
    onError: (error: any) => {
      toast.error('Error While merchant-registration');
    }
  });

  const merchant_verify = useQuery({
    queryKey: [`merchant-verify`],
    enabled: verify_merchant,
    // cacheTime: Infinity,
    retry: 3,
    refetchOnWindowFocus: false,
    retryDelay: 3000,
    queryFn: async () => {
      const response = await campaignServices.verify_merchant(userInfo);
      if (response?.error) throw new Error(response.error || 'Something went wrong');
      return response;
    },
    onError: (error: any) => {
      console.log('campaign status error', JSON.stringify(error, null, 2));
      toast.error('Error While getting campaign list');
    }
  });

  const {
    tokenList,
    merchant_Verify,
    merchant_info,
    merchant_associated,
    campaign_settlement_msg
  } = useMemo(() => {
    const tokenList = merchantRegistrationInfo.data;
    const merchant_Verify = merchant_verify.data;
    const merchant_info = get_merchant_info?.data?.merchantInfo;
    const merchant_associated = get_merchant_info?.data?.response_merchant_assoc;
    const campaign_settlement_msg = campaign_settlement.data;
    return {
      tokenList,
      merchant_Verify,
      merchant_info,
      merchant_associated,
      campaign_settlement_msg
    };
  }, [
    merchantRegistrationInfo?.data,
    merchant_verify?.data,
    get_merchant_info?.data,
    campaign_settlement?.data
  ]);

  return {
    isProcessing: merchantRegistrationInfo.isFetching || merchantRegistrationInfo.isRefetching,
    isMerchantError: merchantRegistrationInfo.isError,
    merchantResponse: tokenList,
    merchant_Verify,
    merchant_info,
    isGettingInfo: get_merchant_info.isFetching || campaign_settlement.isFetching,
    merchant_associated,
    setFetch_merchant_info,
    campaign_settlement_msg,
    campaign_settlement: campaign_settlement.refetch,
    settelmentSuccess: isSettledSuccess,
    registerMerchant: merchantRegistrationInfo.refetch
  };
}
