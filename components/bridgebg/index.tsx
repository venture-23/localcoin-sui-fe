import Image from 'next/image';
import React from 'react';

const BridgeBG = () => {
  return (
    <>
      <Image
        src={'/bridge_background.png'}
        width={200}
        height={200}
        className="absolute bottom-0 z-[-1] w-full opacity-[65%]"
        alt="bridge background"
      />
    </>
  );
};

export default BridgeBG;
