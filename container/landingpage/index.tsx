'use client';
import { QrCodeIcon } from '@heroicons/react/24/outline';
import Button from 'components/botton';
import GetStartedSVG from 'components/getStartedSVG';

import { encodeToken } from 'services/encrypt-decrypt-data';

const LandingPage = () => {
  const campInfo = {
    publicKey: 'GC35FMQWTX7HA2UGRRHLEVT46CEKZBSDDXQXADEZGWWWOZCGCUZOOPE4',
    secretKey: 'SBQD2MZPMRDLDIYE3SPXUD5G5X5IBPI5L7SGV476SHLVHTIJJIRJ3MVN',
    userType: 'campaign'
  };
  const merInfo = {
    publicKey: 'GA443P5NB7YKQW3Q7U7NDUJLFO7HVMQH3FWK7PTR3IUMZAN5JG6UUHL5',
    secretKey: 'SCKKS3FLNGIOXICRNSFVNPBUNZLUA5EMEQESQS2IGLVYYYJAHRQX2GSA',
    userType: 'merchant',
    proprietaryName: 'Props mer',
    phoneNumber: '9860105561',
    storeName: 'Merchant',
    location: 'pokhara'
  };
  const recInfo = {
    publicKey: 'GAJEZJRT7AG4HK5OFFW7K7SZWU4GMT2JYIKIVE23PDLMQONPOLWUAZ2Q',
    secretKey: 'SDD7WD742RDSCUFKYI2BV77AQSU5FQ2C4ZMUMOTFKJRCPTBGTMBT7GZS',
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
      <section className="grid place-items-center">
        <div className="container mx-auto ">
          <div className="flex justify-center ">
            <GetStartedSVG />
          </div>
          <div className="mb-6 mt-4 text-center">
            <h2 className="text-heading mb-0 ">Get Started</h2>
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
              underline={`underline bg-transparent !text-[#212B34]  font-semibold `}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
