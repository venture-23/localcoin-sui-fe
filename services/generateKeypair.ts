// eslint-disable-next-line unicorn/filename-case
import { serverUrl } from 'utils/constants';

/* eslint-disable unicorn/filename-case */
var SorobanClient = require('soroban-client');
serverUrl;
const generateKeyPair = async () => {
  try {
    const server = new SorobanClient.Server(serverUrl, {
      allowHttp: true
    });
    const pair = SorobanClient.Keypair.random();
    const secretKey = pair.secret();
    const publicKey = pair.publicKey();
    const response = await fetch(
      `https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`
    );
    const responseJSON = await response.json();
    console.log('SUCCESS! You have a new account :)\n', responseJSON);
    const account = await server.getAccount(publicKey);
    console.log({ secretKey, account, publicKey });
    return { secretKey, publicKey };
  } catch (e: any) {
    console.warn('ERROR!', e);
    throw new Error(e);
  }
};

export default generateKeyPair;
