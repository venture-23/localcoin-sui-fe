'use client';
import { MapPinIcon, PhoneIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Button from "components/botton";
import CampaignDetailSkeleton from "components/skeleton/campagin-details";
import { useCamapigns } from "hooks";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { coverImageMaps } from "utils/constants";



const StoreDetails = () => {
    const router = useRouter()
    const params = useParams()
    console.log(params,':param')
    const { storeInfo, isStoreFetching  } = useCamapigns({ storeId: params?.storeId, fetchAllCampaigns: false });

    console.log(storeInfo, ':storeInfo')


    if(isStoreFetching) {
        return (
            <section>
                <CampaignDetailSkeleton />
            </section>
        )
    }
  
    
  return (
    <section>
        <div className="container mx-auto">
            <div onClick={() => router.push('/')} className='cursor-pointer py-[18px] flex items-center'>
                  <ChevronLeftIcon width={16} height={16} />
                  <span className='text-[12px] font-normal'>Back</span>
             </div>
             <div className="flex flex-col justify-between h-[calc(100vh_-_75px)]">
                <div>
                <h3 className="text-base font-semibold">{storeInfo?.store_name}</h3>
                <div className={["w-full my-[16px] rounded-[12px] border-[3px] border-solid overflow-hidden relative border-[#D7D7D7]", '', "store-img"].join(' ')}>
                    <Image 
                        src={coverImageMaps[storeInfo?.merchant_address] ?? '/storeImg.png'}
                        alt="Store"
                        height={420}
                        width={400}
                        className={["w-full", coverImageMaps[params?.storeId] === '/merchant_5.jpg' ? 'h-[100px]': 'h-fit' ].join(',')}
                    />
                    {storeInfo?.verification_status ? (
                        <div className='absolute z-[101] flex items-center top-[10px] right-[10px]  border border-[#fff] rounded-[6px] p-[2px] text-[#fff] text-xs font-normal'>
                            <span className='w-[10px] block h-[10px] rounded-[100%] bg-[#6ED365] mr-[2px]'></span> Verified
                        </div>
                    ) : (
                        <div className='absolute z-[101] flex items-center top-[10px] right-[10px]  border border-[#fff] rounded-[6px] p-[2px] text-[#fff] text-xs font-normal'>
                            <span className='w-[10px] block h-[10px] rounded-[100%] bg-[#F24141] mr-[2px]'></span> Unverified
                        </div>
                    )}
                </div>
                <h2 className="text-2xl font-medium mb-[16px]">{storeInfo?.store_name}</h2>
                <div className="flex flex-col gap-[17px]">
                    <div className="flex items-center gap-[6px]">
                        <UserCircleIcon width={20} height={20} />
                        <p className="text-base font-medium">{storeInfo?.proprietor}</p>
                    </div>
                    <div className="flex items-center gap-[6px]">
                        <PhoneIcon width={20} height={20} />
                        <p className="text-base font-medium">{storeInfo?.phone_no}</p>
                    </div>
                    <div className="flex gap-[6px]">
                        <MapPinIcon width={20} height={20} />
                        <p className="text-base self-bottom font-medium whitespace-pre whitespace-pre-wrap">
                            {storeInfo?.location}
                        </p>
                    </div>
                </div>
                </div>
                <div>
                    <Button link={`tel:${storeInfo?.phone_no}`} text="Contact" />
                </div>
             </div>
             
            
        </div>
            
    </section>
  )
}

export default StoreDetails