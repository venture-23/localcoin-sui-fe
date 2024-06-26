import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { campaignServices } from 'services/campaign-services';
import { useLogin } from './useLogin';
import { useMyContext } from './useMyContext';

export function useRecipient({ data = {}, fetchAllToken = false }: any) {
  const { userInfo } = useMyContext();
  const { userDetails } = useLogin()

  const receipientInfo = useQuery({
    queryKey: [`receipient-token-list`],
    enabled: !!userDetails?.address || fetchAllToken,
    // cacheTime: Infinity,
    retry: 3,
    refetchOnWindowFocus: false,
    retryDelay: 3000,
    queryFn: async () => {
      const response = await campaignServices.getReceipientToken(
        userInfo.secretKey,
        userDetails?.address
      );
      if (response?.error) throw new Error(response.error || 'Something went wrong');
      console.log({ response });
      return response;
    },
    onError: (error: any) => {
      console.log('campaign status error', JSON.stringify(error, null, 2));
      toast.error('Error While getting campaign list');
    }
  });

  const sendTokenToMerchant = useQuery({
    queryKey: [`send-token-to_merchant`],
    enabled: false,
    // cacheTime: Infinity,
    retry: 0,
    refetchOnWindowFocus: false,
    retryDelay: 3000,
    queryFn: async () => {
      const response = await campaignServices.transfer_tokens_from_recipient_to_merchant(
        userInfo.secretKey,
        data?.amount,
        data?.tokenAddress,
        data?.merchantAddress,
        userDetails?.address
      );
      if (response?.error) throw new Error(response.error || 'Something went wrong');
      console.log({ response });
      return { success: 'Completed' };
    },
    onError: (error: any) => {
      console.log('campaign status error', JSON.stringify(error, null, 2));
      toast.error('Error While getting campaign list');
    }
  });

  const { tokenList } = useMemo(() => {
    const tokenList = receipientInfo?.data;
    return { tokenList };
  }, [receipientInfo?.data]);
  return {
    tokenList: tokenList,
    fetchToken: receipientInfo.refetch,
    sendTokenToMerchant: sendTokenToMerchant.refetch,
    isFetching: receipientInfo.isFetching || sendTokenToMerchant.isFetching,
    isSendToMerchantSucc: sendTokenToMerchant.isSuccess
  };
}
