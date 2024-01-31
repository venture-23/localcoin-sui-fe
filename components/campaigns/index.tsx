import { DummyCardBox } from "components/dummyCardBox";
import { useCamapigns } from "hooks";

const campaignData = [
    {
        id: 1,
        img: '/campaignImg.png',
        title: 'Bicycle Delivery Training',
        reward: '2500',
        participants: '12',
        date: '1/14/24'
    },
    {
        id: 2,
        img: '/campaignImg.png',
        title: 'Bicycle Delivery Training',
        reward: '2500',
        participants: '12',
        date: '1/14/24'
    },
    {
        id: 3,
        img: '/campaignImg.png',
        title: 'Bicycle Delivery Training',
        reward: '2500',
        participants: '12',
        date: '1/14/24'
    },
    {
        id: 4,
        img: '/campaignImg.png',
        title: 'Bicycle Delivery Training',
        reward: '2500',
        participants: '12',
        date: '1/14/24'
    },
    {
        id: 5,
        img: '/campaignImg.png',
        title: 'Bicycle Delivery Training',
        reward: '2500',
        participants: '12',
        date: '1/14/24'
    },
]

export const Campaigns = () => {
    const { isFetching, campaignList } = useCamapigns({ fetchAllCampaign: true });
    console.log(campaignList, ";cList")
    return (
        <div className="mt-[20px]">
            <div className="flex items-center">
                <h4 className='text-lg font-semibold font-[Inter] mb-[6px]'>Join a campaign to earn</h4>
                {/* <span className="ml-[6px] text-xs">View all</span> */}
            </div>

            <div className={["store-container-box h-[124px] w-[260px] bg-gray-300 animate-pulse rounded-[12px]", campaignList?.length > 0 && "hidden"].join(" ")}></div>

            <div className="flex store-container-box items-center overflow-auto gap-[20px]">
                {
                    campaignList?.map((item: any ,idx: any) => (
                        isFetching ? (
                            <div className="h-[124px] min-w-[260px] bg-gray-300 animate-pulse rounded-[12px]" key={idx}></div>
                        ) : (
                            <DummyCardBox key={idx} boxData={item} boxTitle="Campaigns" />
                        )
                       
                    ))
                }
            </div>

            {!isFetching && campaignList?.length === 0 && (
                <div className="flex store-container-box items-center">
                    <div 
                        className="h-[124px] overflow-hidden min-w-[260px] relative before:content-[''] before:absolute before:h-full before:w-full before:left-0 before:top-0 before:bg-[#000000a6] rounded-[12px] flex jusitfy-center items-center"
                    >
                        <h4 className="text-center relative z-[2] w-full text-[#fff] font-extrabold text-lg">No campaigns created yet</h4>
                    </div>
                </div>
            )}
            
        </div>
    )
}