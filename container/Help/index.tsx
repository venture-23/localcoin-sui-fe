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
             <div>
                Help content
             </div>
        </div>
    </section>
  )
}

export default HelpPage