import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { campaignServices } from 'services/campaign-services';
import { useMyContext } from './useMyContext';

export function useMerchant({ registerMerchant = false, verify_merchant = false, data = {} }) {
  const { userInfo } = useMyContext();

  const merchantRegistrationInfo = useQuery({
    queryKey: [`merchant-registration`],
    enabled: registerMerchant,
    // cacheTime: Infinity,
    retry: 3,
    refetchOnWindowFocus: false,
    retryDelay: 3000,
    queryFn: async () => {
      console.log({ data });
      const response = await campaignServices.merchant_registration(data);
      if (response?.error) throw new Error(response.error || 'Something went wrong');
      console.log({ response }, 'form the merchant registration');
      return response;
    },
    onError: (error: any) => {
      console.log('campaign status error', JSON.stringify(error, null, 2));
      toast.error('Error While getting campaign list');
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
      console.log({ response }, 'form the merchant registration');
      return response;
    },
    onError: (error: any) => {
      console.log('campaign status error', JSON.stringify(error, null, 2));
      toast.error('Error While getting campaign list');
    }
  });

  const { tokenList, merchant_Verify } = useMemo(() => {
    const tokenList = merchantRegistrationInfo.data;
    const merchant_Verify = merchant_verify.data;
    return { tokenList, merchant_Verify };
  }, [merchantRegistrationInfo.data, merchant_verify.data]);

  return {
    isProcessing: merchantRegistrationInfo.isFetching,
    merchantResponse: tokenList,
    merchant_Verify
  };
}
/* 
--merchant_addr GCO5YWMWGT4KCJXWZ3S7ABSO6XXMWZ3OW3VBSR3CXZGIGFQPHAJ5MPG2 \
--proprietor "Carol" \
--phone_no "+977-9851000000" \
--store_name "Carol Super Mart" \
--location "Chhauni,vKathmandu"
*/
