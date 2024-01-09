import { DummyCardBox } from "components/dummyCardBox"

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
    return (
        <div className="mt-[20px]">
            <div className="flex items-center">
                <h4 className='text-lg font-semibold font-[Inter] mb-[6px]'>Join a campaign to earn</h4>
                {/* <span className="ml-[6px] text-xs">View all</span> */}
            </div>

            <div className="flex store-container-box items-center overflow-auto gap-[20px]">
                {
                    campaignData.map((item,idx) => (
                       <DummyCardBox key={idx} boxData={item} boxTitle="Campaigns" />
                    ))
                }
            </div>
            
        </div>
    )
}