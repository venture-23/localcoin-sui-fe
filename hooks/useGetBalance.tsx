import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { campaignServices } from 'services/campaign-services';
import { useMyContext } from './useMyContext';

export function useGetBalance() {
  const { userInfo } = useMyContext();

  const userBalanceResponse = useQuery({
    queryKey: [`user-balance-${userInfo?.publicKey}`],
    enabled: !!userInfo?.publicKey,
    // cacheTime: Infinity,
    retry: 3,
    retryDelay: 3000,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      console.log(userInfo, ':info')
      const response = await campaignServices.getReceipientToken(userInfo.secretKey, userInfo.publicKey);
      if (response?.error) throw new Error(response.error || 'Something went wrong');
      console.log({ response });
      return response;
    },
    onError: (error: any) => {
      console.log('campaign status error', JSON.stringify(error, null, 2));
      toast.error('Error While getting details info');
    }
  });
  const { userBalance } = useMemo(() => {
    const userBalance = userBalanceResponse.data;
    return { userBalance };
  }, [userBalanceResponse.data]);

  return {
    userBalance
  };
}
