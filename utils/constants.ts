const serverUrl = 'https://soroban-testnet.stellar.org';

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