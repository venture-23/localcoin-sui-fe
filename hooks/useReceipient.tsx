import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { campaignServices } from 'services/campaign-services';
import { useMyContext } from './useMyContext';

export function useRecipient() {
  const { userInfo } = useMyContext();

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
  const sendToMerchant = useQuery({
    queryKey: [`sendToMerchant`],
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

  const { tokenList } = useMemo(() => {
    const tokenList = receipientInfo.data;
    return { tokenList };
  }, [receipientInfo.data, sendToMerchant.data]);

  return {
    isFetching: receipientInfo.isFetching,
    tokenList: tokenList
  };
}
