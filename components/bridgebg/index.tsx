import Image from 'next/image';

const BridgeBG = () => {
  return (
    <>
      <Image
        src={'/bridge_background.png'}
        width={200}
        height={200}
        className="absolute bottom-0 z-[-1] w-full opacity-[100%]"
        alt="bridge background"
      />
    </>
  );
};

export default BridgeBG;
