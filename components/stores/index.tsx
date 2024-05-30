import { DummyCardBox } from "components/dummyCardBox";
import { useCamapigns } from "hooks";
import { toHide } from "utils/constants";

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
    console.log(isStoreFetching, ':mer1')
    
    return (
        <div className="mt-[2px]">
            <div className="flex items-center">
                <h4 className='text-lg font-semibold font-[Inter] mb-[6px]'>Visit a store</h4>
                {/* <span className="ml-[6px] text-xs">View all</span> */}
            </div>

            <div className={["store-container-box h-[124px] w-[260px] bg-gray-300 animate-pulse rounded-[12px]", (merchantList?.length > 0 || !isStoreFetching) && "hidden"].join(" ")}></div>

            <div className="flex store-container-box items-center overflow-auto gap-[20px]">
                {   
                    merchantList?.filter((remItem) => !toHide.includes(remItem?.merchant_address)).map((item,idx) => (
                        isStoreFetching ? (
                            <div key={idx} className="h-[124px] min-w-[260px] bg-gray-300 animate-pulse rounded-[12px]">
                                
                            </div>
                        ): (
                            <DummyCardBox key={idx}  boxData={item} boxTitle="Store" />
                        )
                       
                    ))
                }
            </div>
            {!isStoreFetching && (merchantList?.length === 0 || !merchantList) && (
                <div className="flex store-container-box items-center">
                <div  
                    className="h-[124px] overflow-hidden min-w-[260px] relative before:content-[''] before:absolute before:h-full before:w-full before:left-0 before:top-0 before:bg-[#000000a6] rounded-[12px] flex jusitfy-center items-center"
                >
                    <h4 className="text-center relative z-[2] font-['Inter'] w-full text-[#fff] font-extrabold text-lg">No store created yet</h4>
                </div>
            </div>
            )}
            
        </div>
    )
}