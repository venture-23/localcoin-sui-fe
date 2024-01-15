const serverUrl = 'https://soroban-testnet.stellar.org';

const issuanceManagementContract = 'CDHD4V7KCWPCEJBDJFLZFICYVO26WDAUAX2UOEDQYV6H7ANGC72GQWMV';
const campaignContractId = 'CCEUWFV3B2XEJ5AHXAWTTSNRNPDZCWOMTUYOQ7HLZVYAKZCQNAV3PRK7';
const localCoinAddress = 'CCKZTQ2TUDTR2EJJRY3BTPGV6R23UMNSTC6DYKBRBTAJUBC3UCR2BL5U';
const userRegistryContractId = 'CDT2BLUT7NCVMVZE26FIKAKMNSWQ6SUZTRB5JHA4CW2JKPS37IUDIRAT';
const superAdminSecret = 'SB46364SGIGPEQOLRXL6RTVDP4X2HBIMSNPIG246GAQC7VHHGHBOEV4M';
const balanceContractId = 'CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA';

export {
  balanceContractId,
  campaignContractId,
  issuanceManagementContract,
  localCoinAddress,
  serverUrl,
  superAdminSecret,
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