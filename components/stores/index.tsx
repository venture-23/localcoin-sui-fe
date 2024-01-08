import { DummyCardBox } from "components/dummyCardBox"


export const Stores = () => {
    return (
        <div className="mt-[20px]">
            <div className="flex items-center">
                <h4 className='text-lg font-semibold font-[Inter] mb-[6px]'>Stores</h4>
                <span className="ml-[6px] text-xs">View all</span>
            </div>

            <div className="flex store-container-box items-center overflow-auto gap-[20px]">
                {
                    Array.from({ length: 5 }, (_, index) => index).map((_,idx) => (
                       <DummyCardBox key={idx} boxTitle="Store" />
                    ))
                }
            </div>
            
        </div>
    )
}