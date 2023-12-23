const serverUrl = 'https://soroban-testnet.stellar.org';
const issuanceManagementContract = 'CBRVM6U7BXXN7WLDVZIO5XZSHI4USO5B2KJBRA45IRM4HPD342D2TJAW';
const campaignContractId = 'CAIOPXQRZ7HQD6S2O2KICNXZEOEIOXVMSCU3BAKZKBUSMXYMJD57ZX3V';
const localCoinAddress = 'CC4CBVODKWPVRRITF5ABX3JW664MCPV464QE5DUBYMH57XHSZKEZUILT';

export { campaignContractId, issuanceManagementContract, localCoinAddress, serverUrl };



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