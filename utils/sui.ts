type SuiNetwork = 'testnet' | 'mainnet' | 'devnet';

export const getNetwork = (network: string): SuiNetwork => {
  const validNetworks: SuiNetwork[] = ['mainnet', 'testnet', 'devnet'];
  if (validNetworks.includes(network as SuiNetwork)) {
    return network as SuiNetwork;
  }
  return 'testnet';
};

export const APP_NETWORK: SuiNetwork = getNetwork(process.env.NEXT_PUBLIC_NETWORK || 'testnet');
