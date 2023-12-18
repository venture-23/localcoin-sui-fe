export default function CampaignListSkeleton({ defaultData = 1 }) {
  return new Array(defaultData).fill(0).map((x, index) => (
    <div key={index + 1 + ''} className="relative w-full rounded bg-white p-4 ">
      <div className="flex animate-pulse items-center gap-3 space-x-4">
        <div className="h-10 w-10 rounded-full bg-slate-200"></div>
        <div className="!ml-0 flex-1 py-1">
          <div className="h-4 w-[30%] rounded bg-slate-200"></div>
          <div className="mt-1 h-2 w-[20%] rounded bg-slate-200"></div>
        </div>
      </div>
      <span className="absolute right-6 top-1/2 h-6 w-6 -translate-y-1/2 animate-pulse rounded-full bg-slate-200"></span>
    </div>
  ));
}
