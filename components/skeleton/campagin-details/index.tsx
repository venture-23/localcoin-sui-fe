export default function CampaignDetailSkeleton({ defaultData = 1 }) {
  return new Array(defaultData).fill(0).map((x, index) => (
    <div key={index + 1 + ''} className="relative w-full h-[100vh] flex flex-col justify-between  bg-white p-4 ">
      <div>
        <div className="flex animate-pulse flex-col items-center gap-3 space-x-4">
        <div className="flex h-56 w-full flex-col justify-end bg-slate-200 p-4">
          <div className="h-4 w-1/3 bg-slate-300"></div>
          <div className="mt-1 h-2 w-1/4 bg-slate-300"></div>
        </div>
        </div>
        <div className="flex h-10 animate-pulse mt-[10px] w-full flex-col justify-end bg-slate-200 p-4">
          <div className="h-10 w-1/3 bg-slate-300"></div>
          <div className="mt-1 h-2 w-1/4 bg-slate-300"></div>
        </div>
      </div>
      <div className="flex flex-col ">
        
        <div className="my-2 h-12 bg-slate-300 animate-pulse w-full border border-slate-300"></div>
      </div>
    </div>
  ));
}
