import { DummyCardBox } from "components/dummyCardBox"

const storeData = [
    {
        img: '/storeImg.png',
        title: 'H & W Market',
        distance: '0.2 miles',
    },
    {
        img: '/storeImg.png',
        title: 'H & W Market',
        distance: '0.2 miles',
    },
    {
        img: '/storeImg.png',
        title: 'H & W Market',
        distance: '0.2 miles',
    },
    {
        img: '/storeImg.png',
        title: 'H & W Market',
        distance: '0.2 miles',
    },
    {
        img: '/storeImg.png',
        title: 'H & W Market',
        distance: '0.2 miles',
    },

]


export const Stores = () => {
    return (
        <div className="mt-[20px]">
            <div className="flex items-center">
                <h4 className='text-lg font-semibold font-[Inter] mb-[6px]'>Visit a store</h4>
                {/* <span className="ml-[6px] text-xs">View all</span> */}
            </div>

            <div className="flex store-container-box items-center overflow-auto gap-[20px]">
                {
                    storeData.map((item,idx) => (
                       <DummyCardBox key={idx} boxData={item} boxTitle="Store" />
                    ))
                }
            </div>
            
        </div>
    )
}