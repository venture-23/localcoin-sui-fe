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
const CAMPAIGN_PACKAGE_ID = '0xc2c0fd142f5322ae24141d406910d383662d6d38a4a77e94799d56e8966f4b08'
const USDC_TREASURY='0x4372562a5444c4894082c1154cecc49e292df4ef2a2681fe9220bdd9adaae460'
const USDC_FOR_CAMPAIGN='0xfcdc8c5352bf325d4a29143b09c6b3183526dc7338035bcf1b62c836f81692d2'
const USDC_TYPE='0x219d80b1be5d586ff3bdbfeaf4d051ec721442c3a6498a3222773c6945a73d9f::usdc::USDC'
const LC_TOKEN_CAMPAIGN_CREATOR='0x58331b0aae2ed453126453e402afde0aad976c25dc54a142ca5459d0dfda0f72'
const LOCAL_COIN_APP='0x576f72b7bb0689b3553a2d0597c1b8a1e315f474a30c588eabf192a5b9f08942'
const TOKEN_POLICY='0xdbaef9f48144e2ac085ef15b7a645fedada25e61a97768a7f29bcba5b0a808b1'
const MERCHANT_REGISTRY='0x9a7fef60fa51b2d95114584c5f7085a7060702e212011e96146082abf471f910'



export {
  CAMPAIGN_PACKAGE_ID, LOCAL_COIN_APP, MERCHANT_REGISTRY, TOKEN_POLICY, USDC_FOR_CAMPAIGN,
  USDC_TREASURY,
  USDC_TYPE, balanceContractId,
  campaignContractId, issuanceManagementContract,
  localCoinAddress,
  serverUrl, staticPubKey, superAdminSecret,
  userRegistryContractId
};

export type StatusType = 'withdraw' | 'merchant' | 'campaign' | 'recipient_transfer' | 'receipent_transfer_success' | 'creator_transfer_success';

export const successStatusText = {
  'withdraw' : {
    title: 'Withdraw requested.',
    text: 'Your LocalCoin will be credited into USD for you once our administration gets to this transaction. This can take up to 2 business days.'
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