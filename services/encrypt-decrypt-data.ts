var CryptoJS = require('crypto-js');

const encodeToken = (mnemonics: any, password: any, inJson: any = true) => {
  try {
    var ciphertext = CryptoJS.AES.encrypt(
      inJson ? JSON.stringify(mnemonics) : mnemonics,
      password
    ).toString();
    return ciphertext;
  } catch (error) {
    return null;
  }
};

const decodeToken = (token: any, password: any, inJson: any = true) => {
  try {
    var bytes = CryptoJS.AES.decrypt(token, password);
    var originalText = inJson
      ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      : bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  } catch (error) {
    return null;
  }
};

export { decodeToken, encodeToken };
