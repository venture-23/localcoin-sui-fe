import { DummyCardBox } from "components/dummyCardBox";
import { useCamapigns } from "hooks";

const storeData = [
    {
        id: 1,
        img: '/storeImg.png',
        title: 'H & W Market',
        distance: '0.2 miles',
    },
    {
        id: 2,
        img: '/storeImg.png',
        title: 'H & W Market',
        distance: '0.2 miles',
    },
    {
        id: 3,
        img: '/storeImg.png',
        title: 'H & W Market',
        distance: '0.2 miles',
    },
    {
        id: 4,
        img: '/storeImg.png',
        title: 'H & W Market',
        distance: '0.2 miles',
    },
    {
        id: 5,
        img: '/storeImg.png',
        title: 'H & W Market',
        distance: '0.2 miles',
    },

]


export const Stores = () => {
    const { merchantList, isStoreFetching } = useCamapigns({ fetchAllCampaign: true});
    console.log(merchantList, ':mer1')
    return (
        <div className="mt-[20px]">
            <div className="flex items-center">
                <h4 className='text-lg font-semibold font-[Inter] mb-[6px]'>Visit a store</h4>
                {/* <span className="ml-[6px] text-xs">View all</span> */}
            </div>

            <div className="flex store-container-box items-center overflow-auto gap-[20px]">
                {
                    merchantList?.map((item,idx) => (
                        isStoreFetching ? (
                            <div key={idx} className="h-[124px] min-w-[260px] bg-gray-300 animate-pulse rounded-[12px]"></div>
                        ): (
                            <DummyCardBox key={idx}  boxData={item} boxTitle="Store" />
                        )
                       
                    ))
                }
            </div>
            {!isStoreFetching && merchantList?.length === 0 && (
                <div className="flex store-container-box items-center">
                <div  
                    className="h-[124px] overflow-hidden min-w-[260px] relative before:content-[''] before:absolute before:h-full before:w-full before:left-0 before:top-0 before:bg-[#000000a6] rounded-[12px] flex jusitfy-center items-center"
                >
                    <h4 className="text-center relative z-[2] w-full text-[#fff] font-extrabold text-lg">No store created yet</h4>
                </div>
            </div>
            )}
            
        </div>
    )
}