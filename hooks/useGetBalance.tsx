import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import { useWallet } from '@suiet/wallet-kit';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { campaignServices } from 'services/campaign-services';
import { useMyContext } from './useMyContext';

export function useGetBalance() {
  const { userInfo } = useMyContext();
  const client = new SuiClient({ url: getFullnodeUrl('devnet') });
const { signAndExecuteTransactionBlock } = useWallet();

  const userBalanceResponse = useQuery({
    queryKey: [`user-balance-${userInfo?.publicKey}`],
    enabled: !!userInfo?.publicKey,
    // cacheTime: Infinity,
    retry: 3,
    retryDelay: 3000,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      console.log(userInfo, ':info')
      const response = await campaignServices.getReceipientToken(userInfo.publicKey);
      if (response?.error) throw new Error(response.error || 'Something went wrong');
      console.log({ response,  }, ':token');
      // const response = { data: 0 }
      return response;

    },
    onError: (error: any) => {
      console.log('campaign status error', JSON.stringify(error, null, 2));
      toast.error('Error While getting details info');
    }
  });


  const userUsdcBalanceResponse = useQuery({
    queryKey: [`user-usdc-balance-${userInfo?.publicKey}`],
    enabled: !!userInfo?.publicKey,
    // cacheTime: Infinity,
    retry: 3,
    retryDelay: 3000,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      console.log(userInfo, ':info')
      const response = await campaignServices.get_user_balance(userInfo?.publicKey);
      if (response?.error) throw new Error(response.error || 'Something went wrong');
      console.log({ response,  });
      
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

  const { userUsdcBalance } = useMemo(() => {
    const userUsdcBalance = Number(userUsdcBalanceResponse.data) / Math.pow(10, 6) ;
    return { userUsdcBalance };
  }, [userUsdcBalanceResponse.data]);

  return {
    userBalance,
    userUsdcBalance,
    isFetchingUserBalance: userBalanceResponse.isFetching,
    isFetchingUsdcBalance: userUsdcBalanceResponse.isFetching,
  };
}
