import { Chain } from "@suiet/wallet-kit";

const serverUrl = 'https://soroban-testnet.stellar.org';

const issuanceManagementContract = 'CD5IOTDZNKZJSEP3RKH5KJ57C4HMQB3CQKXBOTU4ZM5QJDEXEAZKVDCF';
const campaignContractId = 'CAKN3JRQEXFAVAR4A7EXDOIRYTWI5IMJOISGPJAZCSJRCX67EVD5T23D';
const localCoinAddress = 'CCKZTQ2TUDTR2EJJRY3BTPGV6R23UMNSTC6DYKBRBTAJUBC3UCR2BL5U';
const userRegistryContractId = 'CDBGIGDPRDFZYVFZOE6U37ILEFR235IBHWFYOQJD75YRVMEADAZG4MHH';
const superAdminSecret = 'SB46364SGIGPEQOLRXL6RTVDP4X2HBIMSNPIG246GAQC7VHHGHBOEV4M';
const balanceContractId = 'CBAIOENSLLEKWFIUWPLJWA5E32AEB6ROJHTGUSZO4IVBPB6LQS2MLZKO';
const staticPubKey = 'GBDUWRKIEX5WCXT2O3A62DV6AZNCTON5TVOIZQRLGU6DOI2NGX4MCAXG'; // for read only methods

// SUI contracts
const PACKAGE_ID = '0x1ec32de4ce20586e3108d39a482d79451c4d8af730c7d49a2537425178898360'
const CAMPAIGN_PACKAGE_ID = '0x83051762304ff735f44a1c33c92fd143623c7c76d0442aa57d0c8d4a438e1a59'
const USDC_TREASURY='0x037dee77751bc7c432e9907cbb67b9ad763faa2e978cbc01460f1fcbccd9827e'
const USDC_TYPE='0x96769b642d41a65212c68caa53009b4a31caf9b49019b5a8bb51ed23ae5ce9e5::usdc_coin::USDC_COIN'
const LOCAL_COIN_APP='0xff8d01a3d0a1cff6c1e554440ed433153b37f98640a15036cf4f47f792d9950e'
const TOKEN_POLICY='0x04294ae0df47bfeda7484c8706d426dd42d983cb0c2fe2b564d150e0d6558a5b'
const MERCHANT_REGISTRY='0x446c5f6031e4ae360e311a5f00c047499c582d9deff643f7ac0052e8f1c38be9'



export {
  CAMPAIGN_PACKAGE_ID, LOCAL_COIN_APP, MERCHANT_REGISTRY, PACKAGE_ID, TOKEN_POLICY,
  USDC_TREASURY, USDC_TYPE, balanceContractId, campaignContractId, issuanceManagementContract,
  localCoinAddress,
  serverUrl, staticPubKey, superAdminSecret,
  userRegistryContractId
};

export type StatusType = 'withdraw' | 'merchant' | 'campaign' | 'recipient_transfer' | 'receipent_transfer_success' | 'creator_transfer_success';

export const successStatusText = {
  'withdraw' : {
    title: 'Withdraw requested.',
    text: 'You have received your USDC. If you wish to convert it to fiat currency, please contact the super admin.'
  },
  'merchant': {
    title: 'Congratulations!',
    text: 'Thank you for applying! The Local Coin team will review your application and get back to you within 1 week. If you have any questions, please email admin@localcoin.us'
  },
  'campaign' : {
    title: 'Congratulations!',
    text: 'Your campaign is now live. Participants can now join your campaign to earn rewards. If you have any questions, please email admin@localcoin.us'
  },
  'receipent_transfer_success' : {
    title: 'Payment Sent',
    text: 'Your payment has successfully been sent to the merchant.'
  },
  'creator_transfer_success' : {
    title: 'Payment Sent',
    text: 'Your payment has successfully been sent to the participant.'
  }
}

export const filterCampaigns = [
  {
      "name": "Nitesh's Campaign",
      "id": "CB34NAQ3HNYHEBI4ZTOCC2LYEEY5MFTYAXNWAWVXT7HU4EDTOEMIK3DW"
  },
  {
      "name": "Sudeep's campaign",
      "id": "CC66RRSQQDWOCGPYGX7K3SS6GMHHGWAKTJWJXGHVY4IZK4Q6R4TSM5XY"
  },
  {
      "name": "Donate Medicine",
      "id": "CDYAGP5H6VD6FELBKUS7SEHZDMLJABZHEOYP3YGPN5UOSN6QBJYHL5MO"
  },
  {
    "name": "test campaign xyz",
    "id": "CATGWTTE5M3GZBXX4T6STR5OWHJTQWOQLGERSQYXEO4DHDBT3ISCIU2K"
  },
  {
    "name": "Donate Medicine",
    "id": "CBK3MTW4EI2SH6KEWYZ3SSUGJIPOEWKAJRCYSFOAM3637WLT2HPR4DCF"
  },
  {
    "name": "Testtt",
    "id": "CCG4UA3KTAA7QJV3WPSVKNCYIV3LBQTM3A46DQUZT2HDHO3CQNAUB7TW"
  }
]

export const coverImageMaps = {
  "GBTTE3ALU4ZQHX3T42EKAAJYXOQS5P4OXA4LARBQVQIO7GMHV3AKPH3E": "/merchant_3.jpg",
  "GCECEU7T2PI6DAZ3PPY7OW4JBBTYNFCYQLWWEJXFWGJFKU6S75ZZM35W": '/merchant_4.png',
  "GAJJLIEOO5G3JGAD6T3A65M5NQSVMWYOLX4Y4AXY3V37JHWIFPC4PWLZ": "/merchant_5.jpg"
}


export const SuiDevnetChain: Chain = {
  id: "sui:devnet",
  name: "Sui Devnet",
  rpcUrl: "https://fullnode.devnet.sui.io/",
};
export const SuiTestnetChain: Chain = {
  id: "sui:testnet",
  name: "Sui Testnet",
  rpcUrl: "https://fullnode.testnet.sui.io/",
};
export const SuiMainnetChain: Chain = {
  id: "sui:testnet",
  name: "Sui Testnet",
  rpcUrl: "https://rpc.mainnet.sui.io/",
};


/* 

 'create_campaign',
          ...[
            StringToScVal('TEST'),
            StringToScVal('THIS IS DESCRIPTION'),
            numberToU32(1),
            accountToScVal('CC4CBVODKWPVRRITF5ABX3JW664MCPV464QE5DUBYMH57XHSZKEZUILT'),
            numberToI128(1),
            accountToScVal('GCSEKCSARTFPCCY2ZMC5GPUBYD2DJBTVFUXFO5O3R2Q72QTU4BDPUXXY')
          ]
*/
// soroban contract invoke \
// --id CDZUQM552MGSEH3CFKEEIRJL7KBJR4ZBDC44VKYAHQPW3HT6NHL2F6RL \
// --source alice \
// --network testnet \
// -- \
// create_campaign \
// --name "Donate Medicine" \
// --description "I want to donate medicine to poor people." \
// --no_of_recipients 1 \
// --token_address CCKZTQ2TUDTR2EJJRY3BTPGV6R23UMNSTC6DYKBRBTAJUBC3UCR2BL5U \
// --amount 10000000 \
// --creator alice