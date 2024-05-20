'use client';

import { getFullnodeUrl } from "@mysten/sui.js/client";
import { WalletProvider } from "@suiet/wallet-kit";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


import React from 'react';
const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );

  const networks = {
      testnet: { url: getFullnodeUrl("testnet") },
      mainnet: { url: getFullnodeUrl("mainnet") },
  };


  console.log(networks, ':sui network')

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        <WalletProvider>
          {children}
        </WalletProvider>
    </QueryClientProvider>
  );
};

export default Providers;
