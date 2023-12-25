import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { campaignServices } from 'services/campaign-services';
import { useMyContext } from './useMyContext';

export function useCamapigns({ id = '', getOnGoingCampaign = false }: any) {
  const { userInfo } = useMyContext();

  const campaignListInfo = useQuery({
    queryKey: [`campaignListInfo`],
    enabled: !id && !!userInfo?.publicKey,
    // cacheTime: Infinity,
    retry: 3,
    refetchOnWindowFocus: false,
    retryDelay: 3000,
    queryFn: async () => {
      const response = getOnGoingCampaign
        ? await campaignServices.getAllCampaigns(userInfo.secretKey)
        : await campaignServices.getCreatorCampaigns(userInfo.secretKey, userInfo.publicKey);
      if (response?.error) throw new Error(response.error || 'Something went wrong');
      console.log({ response });
      return response;
    },
    onError: (error: any) => {
      console.log('campaign status error', JSON.stringify(error, null, 2));
      toast.error('Error While getting campaign list');
    }
  });

  const campaignDetailsInfo = useQuery({
    queryKey: [`campaignDetailsInfo-${id}`],
    enabled: !!id,
    // cacheTime: Infinity,
    retry: 3,
    retryDelay: 3000,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await campaignServices.getCampaignInfo(userInfo.secretKey, id);
      if (response?.error) throw new Error(response.error || 'Something went wrong');
      console.log({ response });
      return response;
    },
    onError: (error: any) => {
      console.log('campaign status error', JSON.stringify(error, null, 2));
      toast.error('Error While getting details info');
    }
  });
  const { campaignList, campaignInfo } = useMemo(() => {
    const campaignList = campaignListInfo.data;
    const campaignInfo = campaignDetailsInfo.data;
    return { campaignList, campaignInfo };
  }, [campaignListInfo.data, campaignDetailsInfo.data]);

  return {
    campaignList,
    campaignInfo,
    isFetching: campaignListInfo.isFetching,
    isDetailsFetching: campaignDetailsInfo.isFetching
  };
}
