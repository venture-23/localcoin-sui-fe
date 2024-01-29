const serverUrl = 'https://soroban-testnet.stellar.org';

// const issuanceManagementContract = 'CCULX77ZJZNRFOGGZSA332GE6IMG5SWE5WU5OTO5Z4IDJJIDBISDO26H';
// const campaignContractId = 'CDV34QVNTV7K2UWD4GH4PG2JPJS723XN2K6PB4K3APOR4VHW5W7ZL4R4';
// const localCoinAddress = 'CCKZTQ2TUDTR2EJJRY3BTPGV6R23UMNSTC6DYKBRBTAJUBC3UCR2BL5U';
// const userRegistryContractId = 'CA2W5HEET6YSTWP6QBKR5JC4ZESGOKMVY3AJFW67RN4PRDCOVRN6EPGG';
// const superAdminSecret = 'SB46364SGIGPEQOLRXL6RTVDP4X2HBIMSNPIG246GAQC7VHHGHBOEV4M';
// const balanceContractId = 'CAVZ5VCLHXSHGFI2GXIRFONI66RYWD26AN2SQZIOE26QXAXAVS2GJPE6';
// const staticPubKey = 'GDLRSCX7JV635QA5D6XMM7MRZFGDF42WMRE62F3LFZWJZKU3M2L3VN5U'; // for read only methods

const issuanceManagementContract = 'CAZOYDUGJTIEC4JSGGIBSCIF3IM4QQXVGMOUHKNTHX5M45UVY5I3GKLR';
const campaignContractId = 'CAMVY3S3OECC5YX6V5WG57QGJH5MZCVUNCVN6LTWBFIMQNDQ4TTCMTEP';
const localCoinAddress = 'CCKZTQ2TUDTR2EJJRY3BTPGV6R23UMNSTC6DYKBRBTAJUBC3UCR2BL5U';
const userRegistryContractId = 'CDVSKWTCALOJL6B5VYCR2IDIDHM2ZMA23Z24ANK43LFPY6S27WDPORFS';
const superAdminSecret = 'SB46364SGIGPEQOLRXL6RTVDP4X2HBIMSNPIG246GAQC7VHHGHBOEV4M';
const balanceContractId = 'CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA';
const staticPubKey = 'GDLRSCX7JV635QA5D6XMM7MRZFGDF42WMRE62F3LFZWJZKU3M2L3VN5U'; // for read only methods

export {
  balanceContractId,
  campaignContractId,
  issuanceManagementContract,
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