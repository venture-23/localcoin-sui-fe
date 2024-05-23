'use client';

import { EnokiFlowProvider } from '@mysten/enoki/react';
import { getFullnodeUrl } from '@mysten/sui.js/client';
import { WalletProvider } from '@suiet/wallet-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LoginProvider } from 'contexts';

import React from 'react';

const ENOKI_API_KEY = process.env.NEXT_PUBLIC_ENOKI_KEY || '';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );

  const networks = {
    testnet: { url: getFullnodeUrl('testnet') },
    mainnet: { url: getFullnodeUrl('mainnet') }
  };

  console.log(networks, ':sui network');

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      <EnokiFlowProvider apiKey={ENOKI_API_KEY}>
        <LoginProvider>
          <WalletProvider>{children}</WalletProvider>
        </LoginProvider>
      </EnokiFlowProvider>
    </QueryClientProvider>
  );
};

export default Providers;
