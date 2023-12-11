var CryptoJS = require('crypto-js');

const encodeToken = (mnemonics: any, password: any) => {
  try {
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(mnemonics), password).toString();
    return ciphertext;
  } catch (error) {
    return null;
  }
};

const decodeToken = (token: any, password: any) => {
  try {
    var bytes = CryptoJS.AES.decrypt(token, password);
    var originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return originalText;
  } catch (error) {
    return null;
  }
};

const getLocalStorageValue = (name: string = 'local-coin') => {
  try {
    return localStorage.getItem(name);
  } catch (error) {
    throw Error();
  }
};

const checkPinCorrect = (password: string) => {
  try {
    return decodeToken(getLocalStorageValue(), password);
  } catch (error) {
    throw new Error();
  }
};

export { checkPinCorrect, decodeToken, encodeToken, getLocalStorageValue };
