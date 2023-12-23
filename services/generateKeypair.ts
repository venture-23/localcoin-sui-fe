// eslint-disable-next-line unicorn/filename-case
import { serverUrl } from 'utils/constants';

/* eslint-disable unicorn/filename-case */
var StellarSdk = require('stellar-sdk');

serverUrl;
const generateKeyPair = async () => {
  try {
    const pair = StellarSdk.Keypair.random();
    const secretKey = pair.secret();
    const publicKey = pair.publicKey();
    const response = await fetch(
      `https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`
    );
    const responseJSON = await response.json();
    if (responseJSON) {
      return { secretKey, publicKey };
    }
    // return { secretKey, publicKey };
  } catch (e: any) {
    console.warn('ERROR!', e);
    throw new Error(e);
  }
};

export default generateKeyPair;
