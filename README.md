# Localcoin
Social groups often struggle with a big problem: how to make sure money is used properly. Here are some common issues: 

* Not Knowing Where Money Goes: People who give money often don't know how it's spent, which makes them hesitant to donate. 
* Money Might Not Be Used Right: Giving cash directly can lead to it being used in the wrong way, which doesn't help the cause. 
* Money Leaving the Community: If money isn't spent locally, it doesn't help the community as much as it could. 

To tackle these problems, LocalCoin has a smart solution. It's like a special money system that keeps track of where every dollar goes. With LocalCoin: 

* Organizations can make sure money goes where it's needed. 
* Donors can trust their money is used properly. 
* There's less risk of money being wasted or misused. 
* Money stays in the local community, helping it grow. 

LocalCoin is a local currency system built on the SUI platform that creates tokens with custom spending restrictions that can be issued by the campaign owner (backed by an equivalent amount of stablecoin) and spent by the recipients with authorized merchants.

# Entities of LocalCoin

These are the different users of LocalCoin and what they do: 
* Campaign Creators:
Anyone can be a campaign creator. They create campaigns by transferring a certain amount of USDC to our platform. This creates a campaign, and a corresponding amount of LocalCoin tokens are minted. If someone wants to join their campaign, the creator can also approve their request and share more details about the campaign.

* Recipients:
Users can browse through campaigns on our app. If they find one they like, they can request to join it. Once they're in, they take part in the campaign and provide proof of their participation. After the creator verifies this proof, they transfer LocalCoin tokens to the recipients. Recipients can use their LocalCoin tokens with approved merchants.

* Merchants:
Recipients transfer the tokens to the merchants, who then provide goods or products worth the token amount. This ensures that the money given by the campaign creator is spent as intended. Merchants can then burn the LocalCoin token and get the corresponding amount of stablecoin, which completes the cycle. 

* Merchant Onboarding:
We're working on building a network of merchants who sell quality products. For example, we won't onboard merchants who sell cigarettes or alcohol. Only the super admin/ app admin can add merchants to our network.

# ZkLogin in SUI

- We've integrated zkLogin into the LocalCoin app, making it easier to onboard web2 users into the web3 ecosystem. With zkLogin, Recipients and Merchants have minimal interaction with web3 processes. They don't need to remember their private keys; instead, they can simply log in with their Gmail accounts. Additionally, they remain unaware of the blockchain transactions happening in the background, enhancing their user experience. By combining the sponsored transaction feature provided by enoki services with the ability of zk login, users can experience web2 on web3 platforms without having to worry about signing transactions.

- We have used Enoki SDK (https://docs.enoki.mystenlabs.com/ts-sdk) to integrate ZkLogin into our dApp. Enoki uses the OAuth2 OpenID Connect protocol to request an active JSON Web Token (JWT) from Google when a user comes in with their Google account. Using zkLogin, this JWT is then used to create a self-custodial Sui address. By using zkLogin proofs, Enoki generates a salt and address that the user may use to easily sign transactions inside the dApp by simply entering in with their Google credentials

# Sponsored transaction in SUI
- With the sponsored transaction in SUI, the Merchant and Recipient do not need to pay SUI for the transaction. It will be paid by our wallet , thus making them easier to do transaction on blockchain without having initial fund. By combining the sponsored transaction feature provided by enoki services with the ability of zk login, users can experience web2 on web3 platforms without having to worry about signing transactions.

- Enoki allows builders to fully sponsor all end-user transactions, and Enoki Developer Portal (https://portal.enoki.mystenlabs.com) provides the tools to setup and manage these transactions. Using these, you can pay for transactions on the Sui network on behalf of your users. Doing so further removes complexity for your end users, as they don't need to understand gas fees or even know what a SUI token is, or that they are even conducting transactions on a blockchain.

Website: https://localcoin.us/

App: https://app.localcoin.us/
