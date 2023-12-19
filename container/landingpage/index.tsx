import { QrCodeIcon } from '@heroicons/react/24/outline';
import Button from 'components/botton';
import GetStartedSVG from 'components/getStartedSVG';

import Image from 'next/image';

const LandingPage = () => {
  return (
    <>
      <section className="grid place-items-center bg-white">
        <div className="container mx-auto ">
          <div className="flex justify-center ">
            <GetStartedSVG />
          </div>
          <div className="mb-12 mt-4 text-center">
            <h2 className="text-heading mb-5 ">Get Started</h2>
            <p className="text-color text-lg opacity-[.6]">
              LocalCoin is just around the corner. Choose an option below to get started .
            </p>
          </div>

          <div className="flex flex-col gap-5 ">
            <Button text="Login" link="/signup" />
            <Button
              text="Check for ongoing campaigns"
              buttonIcon={<QrCodeIcon className="text-color h-5 w-5" />}
              buttonType="secondary"
              link="/campaign"
            />

            <Button
              text="Sign up for account"
              link="/signup"
              underline={`underline bg-white !text-[#212B34]  font-semibold `}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
