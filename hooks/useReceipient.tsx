import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { campaignServices } from 'services/campaign-services';
import { useMyContext } from './useMyContext';

export function useRecipient({ data = {}, sendTokenToMer = false }: any) {
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

  const sendTokenToMerchant = useQuery({
    queryKey: [`send-token-to_merchant`],
    enabled: sendTokenToMer,
    // cacheTime: Infinity,
    retry: 3,
    refetchOnWindowFocus: false,
    retryDelay: 3000,
    queryFn: async () => {
      const response = await campaignServices.transfer_tokens_from_recipient_to_merchant(
        userInfo.secretKey,
        data?.amount,
        data?.contractId || 'CB5VITTFVAVRIWZDJ2BITGU3NHE5UEEQWIJ6DJFGNPITHRZVY7EOVIOL',
        data?.merchantAddress,
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
    const tokenList = receipientInfo?.data;
    return { tokenList };
  }, [receipientInfo?.data]);

  return {
    tokenList: tokenList,
    isFetching: receipientInfo.isFetching || sendTokenToMerchant.isFetching
  };
}
