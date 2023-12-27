'use client';
// import { Popover } from '@headlessui/react';
import Button from 'components/botton';
import InputForm from 'components/form/input';
import Select from 'components/form/select';
import TextArea from 'components/form/text-area';
import PageHeader from 'components/pageheader';
// import PopupBox from 'components/popover';

import { useMyContext } from 'hooks/useMyContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { campaignServices } from 'services/campaign-services';

const CreateCampaignPage = () => {
  const router = useRouter();
  const [creatorAddressList, setCreatorAddressList] = useState([]);

  const { userInfo } = useMyContext();
  useEffect(() => {
    if (userInfo.secretKey) {
      campaignServices
        .getTokenNameAddress(userInfo.secretKey)
        .then((x) => {
          console.log({ x });
          setCreatorAddressList(x);
        })
        .catch(() => toast.error('Error from get_address_name'));
    }
  }, [userInfo]);

  const [showLoader, setShowLoader] = useState(false);
  const [selectedToken, setSelectedToken] = useState({});
  const [data, setData] = useState({
    name: '',
    totalAmount: '',
    participant: '',
    description: '',
    creatorAddress: '',
    creatorName: ''
  });
  const [error, setError] = useState<any>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = e;
    delete error[name];
    setData({ ...data, [name]: value });
  };
  const validation = () => {
    const err: any = {};
    if (!data.name) err.name = 'Enter Token Name';
    if (!data.totalAmount) err.totalAmount = 'Enter No of Token';
    if (!data.participant) err.participant = 'Enter Recipients';
    if (!data.description) err.description = 'Enter Description';
    return err;
  };
  const handleSubmit = async () => {
    const errorChecked = validation();
    setError(errorChecked);
    if (Object.keys(errorChecked).length === 0) {
      setShowLoader(true);
      campaignServices
        .createCampaigns(data, userInfo.secretKey, userInfo.publicKey)
        .then((x) => {
          console.log(x);
          if (x._value === undefined) {
            setShowLoader(false);
            console.log(x);
            toast.success('Created a Campaign');
            router.push('/campaign');
          }
        })
        .catch((x) => {
          setShowLoader(false);
          toast.error('Error while creating');
        });
    }
  };
  const handleDropdown = (value) => {
    setData({ ...data, creatorAddress: value.value, creatorName: value.name });
  };
  return (
    <section>
      <div className="container mx-auto">
        <PageHeader backLink={`/campaign`} pageHeaderTitle={'Create Campaign'} />

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
                <span className="font-normal ">Please provide</span> following details details to{' '}
                <span className="font-normal"> create camapaign.</span>{' '}
              </h1>
            </div>
          </div>
        </div>
        <div className="grid gap-5 bg-white px-6 pb-6 pt-8">
          <InputForm
            name="name"
            label={'Title'}
            labelClass={'!mb-[2px]'}
            handleChange={handleChange}
            placeholder={'Enter Title'}
            maxLength={300}
            error={error}
            data={data}
          />
          <TextArea
            name="description"
            label={'Campaign Description'}
            labelClass={'!mb-[2px]'}
            handleChange={handleChange}
            placeholder={'Campaign Description'}
            maxLength={300}
            error={error}
            data={data}
          />
          <Select
            defaultvalue={data.creatorName || ''}
            optionsList={creatorAddressList}
            handleChange={handleDropdown}
          />
          <InputForm
            name="participant"
            label={'No of Recipients'}
            labelClass={'!mb-[2px]'}
            handleChange={handleChange}
            placeholder={'No of Recipients'}
            maxLength={3}
            error={error}
            inputMode="numeric"
            data={data}
          />
          <InputForm
            name="totalAmount"
            handleChange={handleChange}
            label={'Total Amount'}
            labelClass={'!mb-[2px]'}
            placeholder={'Total Amount'}
            maxLength={5}
            error={error}
            inputMode="numeric"
            data={data}
          />
          <div onClick={handleSubmit}>
            <Button disabled={showLoader} showLoader={showLoader} text="Create" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateCampaignPage;
