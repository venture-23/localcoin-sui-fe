"use client";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { DummyCardBox } from "components/dummyCardBox";
import { useCamapigns, useLogin } from "hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyStorePage = () => {
    const router = useRouter()
    const { merchantList, isStoreFetching } = useCamapigns({ fetchAllCampaign: true});
    const [userStores, setUserStores] = useState<any[]>([])
    const { userDetails } = useLogin()

    useEffect(() => {
        if(userDetails?.address) {
            const stores = merchantList?.filter(item => item.merchant_address === userDetails?.address)
            setUserStores(stores)
        }
    }, [userDetails?.address, merchantList])
  return (
    <section>
        <div className="container mx-auto">
            <div onClick={() => router.back()} className='cursor-pointer py-[18px] flex items-center'>
                  <ChevronLeftIcon width={16} height={16} />
                  <span className='text-[12px] font-normal'>Back</span>
             </div>
             <div className="mt-[20px]">
                <div className="flex items-center">
                    <h4 className='text-lg font-semibold font-[Inter] mb-[6px]'>My Stores</h4>
                </div>

                <div className={["store-container-box h-[124px] w-[260px] bg-gray-300 animate-pulse rounded-[12px]", (merchantList?.length > 0 || !isStoreFetching) && "hidden"].join(" ")}></div>

                <div className="store-container-box flex flex-col gap-4">
                {   
                    userStores?.map((item,idx) => (
                        isStoreFetching ? (
                            <div key={idx} className="h-[124px] min-w-[260px] bg-gray-300 animate-pulse rounded-[12px]">
                                
                            </div>
                        ): (
                            <DummyCardBox key={idx}  boxData={item} boxTitle="Store" />
                        )
                       
                    ))
                }
            </div>

                {!isStoreFetching && (userStores?.length === 0 || !userDetails) && (
                <div className="flex store-container-box items-center">
                    <div  
                        className="h-[124px] overflow-hidden min-w-[260px] relative before:content-[''] before:absolute before:h-full before:w-full before:left-0 before:top-0 before:bg-[#000000a6] rounded-[12px] flex jusitfy-center items-center"
                    >
                        <h4 className="text-center relative z-[2] font-['Inter'] w-full text-[#fff] font-extrabold text-lg">No store created yet</h4>
                    </div>
                </div>
                )}
            </div>
        </div>
    </section>
  )
}

export default MyStorePage