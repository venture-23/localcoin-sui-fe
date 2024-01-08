'use client';
import { Campaigns } from 'components/campaigns';
import { PageFooter } from 'components/pageFooter';
import PageHeader from 'components/pageheader';
import { Stores } from 'components/stores';

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
    proprietaryName: 'Property Of Om',
    phoneNumber: '9860105561',
    storeName: 'Om Store Name',
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
      <div className='header-container'>
        <PageHeader />
      </div>
      <section className="">
        <div className="container mx-auto ">
          {/* Dashboard */}
          <div className='mb-[24px]'>
            <h4 className='text-lg font-semibold font-[Inter] mb-[6px]'>Welcome</h4>
            <div className='w-full flex justify-between items-center pl-[21px] pr-[16px] bg-[#EAEBEE] h-[72px]'>
              <div>
                <h6 className='text-xm font-normal'>LocalCoins</h6>
                <div className='text-2xl font-semibold leading-9'>
                  129,338
                </div>
              </div>
              <div className='self-end flex items-center gap-[12px] pb-[10px]'>
                <button className='bg-white rounded-[5px] px-[3px] py-[6px] text-xs font-normal'>Store</button>
                <button className='bg-white rounded-[5px] px-[3px] py-[6px] text-xs font-normal'>Withdraw</button>
              </div>
            </div>
          </div>

          {/* Stores */}
          <Stores />


          {/* Campaigns */}
          <Campaigns />


          {/* <div className="flex justify-center ">
            <GetStartedSVG />
          </div> */}
          {/* <div className="mb-6 mt-4 text-center">
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
          </div> */}

          {/* <div className="flex flex-col gap-5 ">
            <Button text="Sign up for account" link="/signup" />
            <Button
              text="Check for ongoing campaigns"
              buttonIcon={<QrCodeIcon className="text-color h-5 w-5" />}
              buttonType="secondary"
              link="/all-campaigns"
            />

            <Button
              text="Sign up for account"
              link="/signup"
              underline={`underline bg-transparent !text-[#212B34]  font-semibold `}
            />
          </div> */}

          <PageFooter />
        </div>
      </section>
    </>
  );
};

export default LandingPage;
