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
    const { merchantList } = useCamapigns({});
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
                       <DummyCardBox key={idx} boxData={item} boxTitle="Store" />
                    ))
                }
            </div>
            
        </div>
    )
}