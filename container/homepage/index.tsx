'use client';
import { useEffect } from 'react';

import BigNumber from 'bignumber.js';

var SorobanClient = require('soroban-client');

export default function HomePageContain() {
  useEffect(() => {
    async function getAccountInfo() {
      console.log('start');
      const server = new SorobanClient.Server('https://soroban-testnet.stellar.org');
      /*  const test = await server.get_creator_campaigns(
        'GB6A2R4B7MSB7HDD56DC4KIUCML3QGF2IT4JLTFHJNMHGGCJOVS3TELN'
      );
      console.log({ test }); */
      const response = await server.getAccount(
        'GB6A2R4B7MSB7HDD56DC4KIUCML3QGF2IT4JLTFHJNMHGGCJOVS3TELN'
      );

      console.log(
        'response: ',
        { response },

        new BigNumber(response.sequence).div(new BigNumber(10).pow(2))
      );
      // const json = await response.json();
      // console.log({ json });
    }

    // getAccountInfo();
  }, []);

  return <div></div>;
}
