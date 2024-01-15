'use client';
import { MapPinIcon, PhoneIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Button from "components/botton";
import Image from "next/image";
import { useRouter } from "next/navigation";


const StoreDetails = () => {
    // const { isDetailsFetching, storeInfo  } = useCamapigns({ id: props.merchantId });
    // console.log(storeInfo, ':store')
    const router = useRouter()
  return (
    <section>
        <div className="container mx-auto">
            <div onClick={() => router.back()} className='cursor-pointer py-[18px] flex items-center'>
                  <ChevronLeftIcon width={16} height={16} />
                  <span className='text-[12px] font-normal'>Back</span>
             </div>
             <div className="flex flex-col justify-between h-[90vh]">
                <div>
                <h3 className="text-base font-semibold">My Store</h3>
                <div className="w-full my-[16px] rounded-[12px] border-[3px] border-solid overflow-hidden border-[#D7D7D7]">
                    <Image 
                        src={'/storeImg.png'}
                        alt="Store"
                        height={420}
                        width={400}
                        className="w-full"
                    />
                </div>
                <h2 className="text-2xl font-medium mb-[16px]">H & W Market</h2>
                <div className="flex flex-col gap-[17px]">
                    <div className="flex items-center gap-[6px]">
                        <UserCircleIcon width={20} height={20} />
                        <p className="text-base font-medium">Jimmy Buckets</p>
                    </div>
                    <div className="flex items-center gap-[6px]">
                        <PhoneIcon width={20} height={20} />
                        <p className="text-base font-medium">415-342-2917</p>
                    </div>
                    <div className="flex gap-[6px]">
                        <MapPinIcon width={20} height={20} />
                        <p className="text-base self-bottom font-medium whitespace-pre whitespace-pre-wrap">
                            1274 Turk Street Tenderloin,
                            San Francisco 
                            CA, 94102
                        </p>
                    </div>
                </div>
                </div>
                <div>
                    <Button text="Contact" />
                </div>
             </div>
             
            
        </div>
            
    </section>
  )
}

export default StoreDetails