import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { campaignServices } from 'services/campaign-services';
import { filterCampaigns, staticPubKey } from 'utils/constants';
import { useMyContext } from './useMyContext';

export function useCamapigns({ id = '', fetchAllCampaign = false, storeId = '' }: any) {
  const { userInfo } = useMyContext();

  const campaignListInfo = useQuery({
    queryKey: [`campaignListInfo`],
    enabled: fetchAllCampaign,
    // cacheTime: Infinity,
    retry: 3,
    refetchOnWindowFocus: false,
    retryDelay: 3000,
    queryFn: async () => {
      const response = fetchAllCampaign
        ? await campaignServices.getAllCampaigns(staticPubKey)
        : await campaignServices.getCreatorCampaigns(userInfo?.secretKey, userInfo?.publicKey);
      if (response?.error) throw new Error(response.error || 'Something went wrong');
      console.log({ response });
      const filteredResponse = response.filter((item : any) => !filterCampaigns.some(campaign => campaign.id === item.id));
      return filteredResponse;
    },
    onError: (error: any) => {
      console.log('campaign status error', JSON.stringify(error, null, 2));
      toast.error('Error While getting campaign list');
    }
  });

  const merchantListInfo = useQuery({
    queryKey: [`merchantListInfo`],
    enabled: (!id && !!userInfo?.publicKey) || fetchAllCampaign,
    // cacheTime: Infinity,
    retry: 3,
    refetchOnWindowFocus: false,
    retryDelay: 3000,
    queryFn: async () => {
      const merResponse = await campaignServices.get_verified_merchants(staticPubKey);

      const response = [];

      for (const merchantAddr of merResponse) {
        const infoRes = await campaignServices.get_merchant_info(staticPubKey, merchantAddr);
        infoRes.merchantAddress = merchantAddr;
        response.push(infoRes);
      }
      // const response = await campaignServices.get_merchant_info(userInfo.secretKey, merResponse[0])

      console.log(response, ':stores');
      if (response?.error) throw new Error(response.error || 'Something went wrong');
      console.log({ response });
      return response;
    },
    onError: (error: any) => {
      console.log('campaign status error', JSON.stringify(error, null, 2));
      toast.error('Error While getting campaign list');
    }
  });

  const storeDetailInfo = useQuery({
    queryKey: [`storeDetailsInfo-${id}`],
    enabled: !!storeId,
    // cacheTime: Infinity,
    retry: 3,
    retryDelay: 3000,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      console.log(storeId, 'storeId');
      const response = await campaignServices.get_merchant_info(staticPubKey, storeId);
      if (response?.error) throw new Error(response.error || 'Something went wrong');
      console.log({ response });
      return response;
    },
    onError: (error: any) => {
      console.log('merchant status error', JSON.stringify(error, null, 2));
      toast.error('Error While getting details info');
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
      const response = await campaignServices.getCampaignInfo(staticPubKey, id);
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

  const { merchantList, storeInfo } = useMemo(() => {
    const merchantList = merchantListInfo.data;
    const storeInfo = storeDetailInfo.data;
    return { merchantList, storeInfo };
  }, [merchantListInfo.data, storeDetailInfo.data]);

  return {
    campaignList,
    campaignInfo,
    isFetching: campaignListInfo.isFetching,
    isDetailsFetching: campaignDetailsInfo.isFetching,
    merchantList,
    storeInfo,
    isStoreFetching: merchantListInfo.isFetching
  };
}
