# Localcoin

LocalCoin is a closed cycle token system designed to enable on-chain control and tracking of financial incentives in the real world. It is a platform designed to empower communities through transparent and effective fund distribution. It connects Campaign Creators, Merchants, and Participants to drive positive local change. Campaign creators can manage social projects with full visibility, and donors can track the impact of their contributions. Participants earn LocalCoin by completing community tasks and can spend it at registered merchants, supporting local businesses and preventing misuse..

# Localcoin Mobile App

# Functional Specification

## Campaign Creation

- Log in with their google account
- Create a campaign
- Define the parameters of campaign
- Specify an amount object of token(USDC) to be minted
- Send the required amount of stablecoin to back the token
- Verify the join request by the recipients
- Scan QR of recipients to transfer them incentives

## Recipient onboarding

- Recipients Logs in with their google accoun to create a wallet
- Joins a campaign and get verfied by campaign owner
- Complete the campaign by proving their availability
- Share the QR for requesting incentive

## Merchant onboarding

- Log in with their google account to create a wallet
- Apply for the merchant and get verified by super admin of localcoin
- Recipient will scan the QR to buy items from their stores by paying localCoin
- After this step the merchant can receive tokens from recipients
- Convert their LocalCoin tokens to USDC. For fiat currency, settle with the Super admin or keep the USDC tokens in your wallet.



## Merchant Settlement

- Tokens accumulated by the merchant from recipients can be transferred to a settlement account controlled by the campaign owner.
- Campaign manager will settle local currency with the merchant.
- Tokens that come to this settlement account cannot be transferred and have reached their end of life.

## ZkLogin in SUI

- zkLogin is utilized in our dApp to accelerate the Google OAuth login user authentication process. Enoki uses the OAuth2 OpenID Connect protocol to request an active JSON Web Token (JWT) from Google when a user comes in with their Google account. Using zkLogin, this JWT is then used to create a self-custodial Sui address. By using zkLogin proofs, Enoki generates a salt and address that the user may use to easily sign transactions inside the dApp by simply entering in with their Google credentials. This procedure eliminates the requirement for conventional private key management while guaranteeing simple and safe access.

## Sponsored Transactions on SUI

- Enoki allows builders to fully sponsor all end-user transactions, and Enoki Developer Portal provides the tools to setup and manage these transactions. Using these, you can pay for transactions on the Sui network on behalf of your users. Doing so further removes complexity for your end users, as they don't need to understand gas fees or even know what a SUI token is, or that they are even conducting transactions on a blockchain.

Sponsored transactions will enable users to gain the following advantages:
1. **No Gas Costs**: Users can execute transactions for less money when they use sponsored transactions, which lowers their gas costs to zero.
2. **Better User Experience**: By allowing users to concentrate on their application logic rather than the underlying transaction processing, sponsored transactions create a more seamless and streamlined user experience.
3. By combining the sponsored transaction feature provided by enoki services with the ability of zk login, users can experience web2 on web3 platforms without having to worry about signing transactions.

# Mobile App Design

## Wireframe Design

https://www.figma.com/file/DuJv4E8Fx0y93HLiJ30734/LocalCoin-Test?type=design&node-id=0-1&mode=design&t=DBc7C1eMJf4PL375-0

## Final Design

https://www.figma.com/file/kT47LTqARggAQUuyNSbomj/LocalCoin?type=design&node-id=0-1&mode=design&t=rHOxdCC86L8RvkLv-0
