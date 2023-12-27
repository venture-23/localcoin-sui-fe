import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { campaignServices } from 'services/campaign-services';
import { useMyContext } from './useMyContext';

export function useRecipient({ data = {} }: any) {
  const { userInfo } = useMyContext();
  const [enabledSendToMerchant, setEnabledSendToMerchant] = useState(false);

  const receipientInfo = useQuery({
    queryKey: [`receipientInfo`],
    enabled: !!userInfo.publicKey,
    // cacheTime: Infinity,
    retry: 3,
    refetchOnWindowFocus: false,
    retryDelay: 3000,
    queryFn: async () => {
      const response = await campaignServices.getReceipientToken(
        userInfo.secretKey,
        userInfo.publicKey
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
    enabled: enabledSendToMerchant,
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
        userInfo.publicKey
      );
      setEnabledSendToMerchant(false);
      if (response?.error) throw new Error(response.error || 'Something went wrong');
      console.log({ response });
      return response;
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
    setEnabledSendToMerchant,
    tokenList: tokenList,
    sendTokenToMerchant: sendTokenToMerchant.refetch,
    isFetching: receipientInfo.isFetching || sendTokenToMerchant.isFetching
  };
}
