'use client';
import { CalendarIcon, CurrencyDollarIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";

export interface IBoxDataProps {
    id?: Number
    img?: string
    title?: string
    distance?: string,
    reward?: string,
    participants?: string,
    date?: string,
    campaign?: string,
    name?: string,
    no_of_recipients?: string
    token_minted?: string
    location?: string
    phone_no?: string
    proprietor?: string
    store_name?: string
    verified_status?: string
    merchantAddress?: string
}
export interface IDummyCardBoxProps {
    boxTitle: string
    boxData: IBoxDataProps,
}

export const DummyCardBox = ({ boxTitle, boxData }: IDummyCardBoxProps) => {
    const router = useRouter()
    return (
        <div style={{
                background: `url('/campaignImg.png')`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }} 
            className="h-[124px] card-box p-[10px] flex-none rounded-[12px] cursor-pointer w-[290px] flex items-end"
            onClick={() => router.push(`/${boxTitle === 'Campaigns' ? `all-campaigns/${boxData?.campaign}` : `all-stores/${boxData?.merchantAddress}`}`)}
        >
            <div className="w-full flex flex-col gap-[7px]">
                <div className="flex items-center w-full justify-between">
                    <div className="text-base font-medium text-[#fff]">
                        <div>{boxTitle === 'Campaigns' ? boxData?.name : boxData?.store_name}</div>
                    </div>
                    {boxData?.distance && (
                        <div className="text-base font-medium text-[#fff]">
                            <div>{boxData?.distance}</div>
                        </div>
                    )}
                    
                </div>
                {boxTitle === 'Campaigns' && (
                    <div className="flex items-center card-secondary-data gap-[12px]">
                  
                        <div className="flex items-center gap-[3px]">
                            <CurrencyDollarIcon />
                            <span className="text-[#fff] font-normal text-[10px]">{boxData?.token_minted}</span>
                        </div>
                 


                 
                        <div className="flex items-center gap-[3px]">
                            <UserCircleIcon />
                            <span className="text-[#fff] font-normal text-[10px]">{boxData?.no_of_recipients}/100</span>
                        </div>
              

                 
                        <div className="flex items-center gap-[3px]">
                            <CalendarIcon />
                            <span className="text-[#fff] font-normal text-[10px]">{'1/14/24'}</span>
                        </div>
              
                    

                </div>

                )}
                
            </div>
        </div>
        
    )
}