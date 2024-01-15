import { ChevronLeftIcon } from "@heroicons/react/24/outline"
import Button from "components/botton"
import Link from "next/link"

const Withdraw = () => {
    
  return (
    <section>
        <div className='container mx-auto'>
          <Link href={'/'}>
              <div className='cursor-pointer py-[18px] flex items-center'>
                  <ChevronLeftIcon width={16} height={16} />
                  <span className='text-[12px] font-normal'>Back</span>
             </div>
          </Link>
            
             <div className="flex flex-col justify-between h-[90vh]">
                <div>
                   <h2 className="text-xl font-semibold text-[#222] mb-[12px]">Withdraw Funds</h2>
                   <p className="text-base font-medium">You have LocalCoin ready to settle</p>

                   <div className="bg-[#fff] border p-[16px] mt-[16px] border-[#E4E4E7] rounded-[12px]">
                       <p className="text-base font-medium text-[#1384F5]">Total LocalCoin Available</p>
                       <h2 className="text-[32px] font-">869</h2>
                   </div>
                </div>

                <div>
                    <Button text="Withdraw" />
                </div>
                
             </div>
        </div>
    </section>
    
  )
}

export default Withdraw