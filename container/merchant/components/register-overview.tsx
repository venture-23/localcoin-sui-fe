import Button from 'components/botton';

export default function RegisterOverView({ data, loader, handleSubmit }: any) {
  return (
    <div className="bg-white">
      <div className="relative p-6">
        <h2 className="mb-2 text-2xl font-bold">{'Store Overview'}</h2>
        <p>This is how your Store will be seen. Are you ready to connect your store?</p>
      </div>
      <div>My Store Name</div>
      <div className="rounded-top-[4px]">
        <div className="relative">
          {/* <Image
              alt="heading image"
              width={388}
              height={104}
              src={'/heading_bg.png'}
              className="!w-full"
            /> */}
          <div
            className="left-7 top-7 p-6"
            style={{ backgroundImage: 'url("/heading_bg.png")', backgroundSize: 'cover' }}
          >
            <h1 className=" text-2xl font-bold  !text-white">
              <span className="font-normal ">{data.store_name}</span>
            </h1>
          </div>
        </div>
      </div>
      <div>{data.proprietor}</div>
      <div>{data.phone_no}</div>
      <div>{data.location}</div>
      <div onClick={handleSubmit}>
        <Button text="Apply" showLoader={loader} disabled={loader} />
      </div>
    </div>
  );
}
