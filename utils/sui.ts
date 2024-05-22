import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';

type SuiNetwork = 'testnet' | 'mainnet';

export const getNetwork = (network: string): SuiNetwork => {
  const validNetworks: SuiNetwork[] = ['mainnet', 'testnet'];
  if (validNetworks.includes(network as SuiNetwork)) {
    return network as SuiNetwork;
  }
  return 'testnet';
};

export const APP_NETWORK: SuiNetwork = getNetwork(process.env.NEXT_PUBLIC_NETWORK || 'testnet');
export const SUI_CLIENT = new SuiClient({ url: getFullnodeUrl(APP_NETWORK) });
