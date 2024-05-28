"use client";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const HelpPage = () => {
    const router = useRouter()
  return (
    <section>
        <div className="container mx-auto">
            <div onClick={() => router.back()} className='cursor-pointer py-[18px] flex items-center'>
                  <ChevronLeftIcon width={16} height={16} />
                  <span className='text-[12px] font-normal'>Back</span>
             </div>
             <div className="flex flex-col gap-[20px] py-[20px]">
                <div className="flex flex-col gap-[8px]">
                  <h3 className="text-xl font-extrabold">For Campaign Creators</h3>
                  <h5 className="text-lg font-bold">Getting Started</h5>
                  <ol className="list-disc flex flex-col gap-[4px]">
                    <li>
                      <p className="text-base">
                        <strong>Create a Campaign:</strong>
                        Enter the campaign details, including the campaign name, description, USDC object(the stable coin that is required to fund the campaign), and the number of recipients. After creating a campaign, the campaign creator will receive the equivalent number of local coin tokens.
                      </p>
                    </li>
                    <li>
                      <p className="text-base">
                        <strong>Verify Recipients:</strong>
                        Review and approve users who request to join your campaign.
                      </p>
                    </li>
                    <li>
                      <p className="text-base">
                        <strong>Fund Tokens:</strong>
                        Distribute LocalCoin tokens to recipients after they complete the campaign tasks..
                      </p>
                    </li>
                  </ol>
                </div>

                <div className="flex flex-col gap-[8px]">
                  <h3 className="text-xl font-extrabold">For Recipients</h3>
                  <h5 className="text-lg font-bold">Joining and Participating</h5>
                  <ol className="list-disc flex flex-col gap-[4px]">
                    <li>
                      <p className="text-base">
                        <strong>Join a Campaign:</strong>
                        Browse campaigns and request to join one.
                      </p>
                    </li>
                    <li>
                      <p className="text-base">
                        <strong>Perform the tasks:</strong>
                        Complete the tasks required by the campaign.
                      </p>
                    </li>
                    <li>
                      <p className="text-base">
                        <strong>Recieve Tokens:</strong>
                        Show your QR code to the campaign creator to receive LocalCoin tokens.
                      </p>
                    </li>
                    <li>
                      <p className="text-base">
                        <strong>Spend Tokens:</strong>
                        Use your tokens at approved merchants. Scan the merchant’s QR code and transfer the specified amount.
                      </p>
                    </li>
                  </ol>
                </div>

                <div className="flex flex-col gap-[8px]">
                  <h3 className="text-xl font-extrabold">For Merchants</h3>
                  <h5 className="text-lg font-bold">Accepting and Converting Payments</h5>
                  <ol className="list-disc flex flex-col gap-[4px]">
                    <li>
                      <p className="text-base">
                        <strong>Accept LocalCoin Payments:</strong>
                        Sell items and accept LocalCoin tokens from recipients. Show your QR code for payment.
                      </p>
                    </li>
                    <li>
                      <p className="text-base">
                        <strong>Convert LocalCoin recieved into StableCoin: </strong>
                        Convert your LocalCoin tokens to USDC. For fiat currency, settle with the Superadmin or keep the USDC tokens in your wallet.

                      </p>
                    </li>
                  </ol>
                </div>

             </div>
        </div>
    </section>
  )
}

export default HelpPage