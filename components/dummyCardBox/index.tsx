import { CalendarIcon, CurrencyDollarIcon, UserCircleIcon } from "@heroicons/react/16/solid"

interface IBoxDataProps {
    img?: string
    title?: string
    distance?: string,
    reward?: string,
    participants?: string,
    date?: string,
}
interface IDummyCardBoxProps {
    boxTitle: string
    boxData: IBoxDataProps,
}

export const DummyCardBox = ({ boxTitle, boxData }: IDummyCardBoxProps) => {
    return (
        <div style={{
                background: `url(${boxData?.img})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }} 
            className="h-[124px] card-box p-[10px] flex-none rounded-[12px] w-[290px] flex items-end"
        >
            <div className="w-full flex flex-col gap-[7px]">
                <div className="flex items-center w-full justify-between">
                    <div className="text-base font-medium text-[#fff]">
                        <div>{boxData?.title}</div>
                    </div>
                    {boxData?.distance && (
                        <div className="text-base font-medium text-[#fff]">
                            <div>{boxData?.distance}</div>
                        </div>
                    )}
                    
                </div>
                <div className="flex items-center card-secondary-data gap-[12px]">
                    {boxData?.reward && (
                        <div className="flex items-center">
                            <CurrencyDollarIcon />
                            <span className="text-[#fff] font-normal text-[10px]">{boxData?.reward}</span>
                        </div>
                    )}


                    {boxData?.participants && (
                        <div className="flex items-center">
                            <UserCircleIcon />
                            <span className="text-[#fff] font-normal text-[10px]">{boxData?.participants}/100</span>
                        </div>
                    )}

                    {boxData?.date && (
                        <div className="flex items-center">
                            <CalendarIcon />
                            <span className="text-[#fff] font-normal text-[10px]">{boxData?.date}</span>
                        </div>
                    )}
                    

                </div>
            </div>
        </div>
    )
}