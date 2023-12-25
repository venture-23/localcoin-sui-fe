const serverUrl = 'https://soroban-testnet.stellar.org';
const issuanceManagementContract = 'CBRVM6U7BXXN7WLDVZIO5XZSHI4USO5B2KJBRA45IRM4HPD342D2TJAW';
const campaignContractId = 'CAIOPXQRZ7HQD6S2O2KICNXZEOEIOXVMSCU3BAKZKBUSMXYMJD57ZX3V';
const localCoinAddress = 'CC4CBVODKWPVRRITF5ABX3JW664MCPV464QE5DUBYMH57XHSZKEZUILT';
const userRegistryContractId = 'CBOM3ZDKJINTA3MLYPBBWX4JHT45HTE4SKNOVE2NFB45CJET6AVDOTYB';
const superAdminSecret = 'SB46364SGIGPEQOLRXL6RTVDP4X2HBIMSNPIG246GAQC7VHHGHBOEV4M';

// const issuanceManagementContract = 'CBKMG726I7FWIDTHVVCAAX3LGQJLD626LKO66ZO64BV6KNLKTYBKJIPV';
// const campaignContractId = 'CCQ5QHLGS2IG3WBKKP4BHJMX2HFRWE3FLCHF6DGKSDFOR3TLL6TX5MNR';
// const localCoinAddress = 'CC4CBVODKWPVRRITF5ABX3JW664MCPV464QE5DUBYMH57XHSZKEZUILT';
// const userRegistryContractId = 'CBJ46O2NPEBH2AUZ2SEB6HP533AL5ZAS42MQ2BZR2IWWOXXEQ364GGZJ';
// const superAdminSecret = 'SB46364SGIGPEQOLRXL6RTVDP4X2HBIMSNPIG246GAQC7VHHGHBOEV4M';

export {
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