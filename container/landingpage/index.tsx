'use client';
import { QrCodeIcon } from '@heroicons/react/24/outline';
import Button from 'components/botton';
import GetStartedSVG from 'components/getStartedSVG';

import { encodeToken } from 'services/encrypt-decrypt-data';

const LandingPage = () => {
  const campInfo = {
    publicKey: 'GCYVMD4FOY2B3HDZE7AYQJ5LW7OOTMGQAY5O57EDYGESM7DAKSBFB3KB',
    secretKey: 'SBQH6RJAZCOTQ7FQQKZL5U62UZ6F3JSTGW64YV62RY6GPU344FE6MYDB',
    userType: 'campaign'
  };
  const merInfo = {
    publicKey: 'GDYE7UFCWHVZSIZZC2CC2T7KXNXXGH35AI6B7HYEOSPHBB6C6PHVOM5S',
    secretKey: 'SCXXWGY33KYLQGLAV5ACCIBES75EGN5MYQDIKBPUFH3OWGIANFCH27DA',
    userType: 'merchant',
    proprietaryName: 'Props mer',
    phoneNumber: '9860105561',
    storeName: 'Merchant',
    location: 'pokhara'
  };
  const recInfo = {
    publicKey: 'GAFD2TMWS75B5VHQTUQ3E534UEHNLRIHH64VYO4EAMYNEIDXJ765JI34',
    secretKey: 'SB3ROUYQSLTY5WTGQSILQ34G46IKPRW4C6ROVOHUIZCMUHOMAQHAZUIJ',
    userType: 'recipient'
  };
  const handleClick = (name: string) => {
    const mapValue: any = {
      c: campInfo,
      m: merInfo,
      r: recInfo
    };
    localStorage.setItem('local-coin', encodeToken(mapValue[name], '1111'));
    window.location.reload();
  };

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
              LocalCoin is just around the corner.
              <span
                onClick={() => {
                  handleClick('c');
                }}
              >
                Choose
              </span>{' '}
              <span
                onClick={() => {
                  handleClick('m');
                }}
              >
                an&nbsp;
              </span>
              <span
                onClick={() => {
                  handleClick('r');
                }}
              >
                option&nbsp;
              </span>
              below to get started .
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
