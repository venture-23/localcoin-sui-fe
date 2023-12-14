# Localcoin

LocalCoin is a closed cycle token system designed to enable on-chain control and tracking of financial incentives in the real world. It is a product and service that manages the disbursement of funds which have restrictions on how they may be spent, comprising smart contracts on Soroban, a web app and mobile app, and eventually a payment card and seamless DAO integration.

# Localcoin Mobile App

# Functional Specification

## Campaign Creation

- Choose an existing token with acceptable restrictions or specify a name for a new token
- Define token spending constraints
- Define other parameters
- Specify an amount of token to be minted
- Send the required amount of stablecoin to back the token

## Merchant onboarding

- Selects merchant persona and creates a wallet
- Campaign manager or field admin scans QR code on Merchant App to add the merchant to the approved merchant list
- After this step the merchant can receive tokens from recipients

## Recipient onboarding

- Selects Recipient persona and creates a wallet

## Token Transactions

- Merchant app generates a QR code request for payment and an itemized receipt
- Customer scans the QR code and approves the token transfer to the merchant

## Merchant Settlement

- Tokens accumulated by the merchant from recipients can be transferred to a settlement account controlled by the campaign owner.
- Campaign manager will settle local currency with the merchant.
- Tokens that come to this settlement account cannot be transferred and have reached their end of life.

# Mobile App Design

## Wireframe Design

https://www.figma.com/file/DuJv4E8Fx0y93HLiJ30734/LocalCoin-Test?type=design&node-id=0-1&mode=design&t=DBc7C1eMJf4PL375-0

## Final Design

https://www.figma.com/file/Wdq44TfGM3o85fXDna3Gd6/Mobile_App_UX%2FUI_Final?type=design&node-id=71-1273&mode=design&t=5SliUVkDdLSvN3uk-0
