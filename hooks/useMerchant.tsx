import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { campaignServices } from 'services/campaign-services';
import { useMyContext } from './useMyContext';

export function useMerchant({
  merchantAddress = '',
  registerMerchant = false,
  verify_merchant = false,
  data = {}
}) {
  const { userInfo } = useMyContext();
  console.log(!!merchantAddress, '!!merchantAddress');

  const get_merchant_info = useQuery({
    queryKey: [`get_merchant_info`],
    enabled: !!merchantAddress,
    // cacheTime: Infinity,
    retry: 3,
    refetchOnWindowFocus: false,
    retryDelay: 3000,
    queryFn: async () => {
      console.log('get_merchant_info');
      const response = await campaignServices.get_merchant_info(
        userInfo.secretKey,
        merchantAddress
      );
      const response_merchant_assoc = await campaignServices.get_merchant_associated(userInfo);
      if (response?.error || response?.response_merchant_assoc)
        throw new Error(response.error || 'Something went wrong');
      return response || {};
    },
    onError: (error: any) => {
      console.log('campaign status error', JSON.stringify(error, null, 2));
      toast.error('Error While getting campaign list');
    }
  });

  //   const get_merchant_associated = useQuery({
  //     queryKey: [`get_merchant_associated`],
  //     enabled: !!merchantAddress,
  //     // cacheTime: Infinity,
  //     retry: 3,
  //     refetchOnWindowFocus: false,
  //     retryDelay: 3000,
  //     queryFn: async () => {
  //       console.log('get_merchant_associated');
  //       const response = await campaignServices.get_merchant_associated(userInfo);
  //       if (response?.error) throw new Error(response.error || 'Something went wrong');
  //       console.log({ response }, 'form the get_merchant_associated');
  //       return response || [];
  //     },
  //     onError: (error: any) => {
  //       console.log('campaign status error', JSON.stringify(error, null, 2));
  //       toast.error('Error While getting campaign list');
  //     }
  //   });

  const merchantRegistrationInfo = useQuery({
    queryKey: [`merchant-registration`],
    enabled: registerMerchant,
    // cacheTime: Infinity,
    retry: 3,
    refetchOnWindowFocus: false,
    retryDelay: 3000,
    queryFn: async () => {
      const response = await campaignServices.merchant_registration(data);
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
      const response = await campaignServices.get_merchant_associated(userInfo);
      if (response?.error) throw new Error(response.error || 'Something went wrong');
      return response;
    },
    onError: (error: any) => {
      console.log('campaign status error', JSON.stringify(error, null, 2));
      toast.error('Error While getting campaign list');
    }
  });

  const { tokenList, merchant_Verify, merchant_info, merchant_associated } = useMemo(() => {
    const tokenList = merchantRegistrationInfo.data;
    const merchant_Verify = merchant_verify.data;
    const merchant_info = get_merchant_info.data;
    // const merchant_associated = get_merchant_associated.data;
    const merchant_associated = [];
    return { tokenList, merchant_Verify, merchant_info, merchant_associated };
  }, [
    merchantRegistrationInfo?.data,
    merchant_verify?.data,
    get_merchant_info?.data
    // get_merchant_associated?.data
  ]);

  return {
    isProcessing: merchantRegistrationInfo.isFetching,
    merchantResponse: tokenList,
    merchant_Verify,
    merchant_info,
    isGettingInfo: get_merchant_info.isFetching,
    merchant_associated
  };
}
/* 
--merchant_addr GCO5YWMWGT4KCJXWZ3S7ABSO6XXMWZ3OW3VBSR3CXZGIGFQPHAJ5MPG2 \
--proprietor "Carol" \
--phone_no "+977-9851000000" \
--store_name "Carol Super Mart" \
--location "Chhauni,vKathmandu"
*/
