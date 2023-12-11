/* eslint-disable unicorn/filename-case */
var SorobanClient = require('soroban-client');

const generateKeyPair = () => {
  // const server = new SorobanClient.Server('https://soroban-testnet.stellar.org');
  try {
    const secretKey = SorobanClient.Keypair.random().secret();
    const publicKey = SorobanClient.Keypair.random().publicKey();
    return { secretKey, publicKey };
  } catch (error) {
    throw Error();
  }
};

export default generateKeyPair;
