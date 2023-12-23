export default function CampaignDetailSkeleton({ defaultData = 1 }) {
  return new Array(defaultData).fill(0).map((x, index) => (
    <div key={index + 1 + ''} className="relative w-full p-4 bg-white rounded ">
      <div className="flex flex-col items-center gap-3 space-x-4 animate-pulse">
        <div className="flex flex-col justify-end w-full h-56 p-4 bg-slate-100">
          <div className="w-1/3 h-4 bg-slate-200"></div>
          <div className="w-1/4 h-2 mt-1 bg-slate-200"></div>
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="w-full h-12 my-2 mt-3 border border-slate-200"></div>
        <div className="w-full h-12 my-2 border border-slate-200"></div>
        <div className="w-full h-12 my-2 border border-slate-200"></div>
      </div>
    </div>
  ));
}
