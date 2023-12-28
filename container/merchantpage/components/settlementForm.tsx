import Button from 'components/botton';
import Drawer from 'components/drawer';
import InputForm from 'components/form/input';
import Select from 'components/form/select';
import { useMerchant } from 'hooks/useMerchant';
import { useRecipient } from 'hooks/useReceipient';
import { useEffect, useState } from 'react';

const SettlementForm = ({ setActive }: any) => {
  const [data, setData] = useState<any>({});
  const [error, setError] = useState({});
  const [openDrawer, setOpenDrawer] = useState(false);

  const { isGettingInfo, campaign_settlement, settelmentSuccess } = useMerchant({ data });
  console.log({ settelmentSuccess });
  useEffect(() => {
    if (settelmentSuccess) {
      setOpenDrawer(false);
      // setActive(1);
    }
  }, [settelmentSuccess]);

  const handleChange = (e: any) => {
    const {
      target: { name, value }
    } = e;
    console.log({ name, value });
    delete error[name];
    setData({ ...data, [name]: value });
  };

  const handleDropdown = (value: any) => {
    console.log({ value });
    delete error['tokenName'];
    setData({ ...data, tokenId: value.contractToken, tokenName: value.name });
  };
  const { tokenList } = useRecipient({});

  const validation = () => {
    const err: any = {};
    if (!data.tokenName) err.tokenName = 'Select One';
    if (!data.amount) err.amount = 'Enter amount for the settelment';

    return err;
  };

  const handleSubmit = () => {
    const err = validation();
    setError(err);
    if (Object.keys(err).length === 0) {
      campaign_settlement();
      console.log('manish chhetri', data);
    }
  };

  return (
    <>
      <div className="grid gap-2">
        <Button
          handleClick={() => setOpenDrawer(true)}
          text="Request for Settlement"
          underline={`  bg-white border border-gray-200 !text-[#212B34]  font-semibold `}
        />
        <Button
          text="Finish Settlement"
          underline={`  bg-white border border-gray-200 !text-[#212B34]  font-semibold `}
        />
        <Drawer open={openDrawer} setOpen={setOpenDrawer} panelTitle="Share QR Code">
          <Select
            label="Select Token"
            defaultvalue={data.tokenName || ''}
            optionsList={tokenList}
            name="tokenName"
            error={error}
            handleChange={handleDropdown}
          />
          <InputForm
            placeholder=" Token Amount"
            data={data}
            error={error}
            type="number"
            name="amount"
            maxLength={300}
            inputMode="numeric"
            label="Token Amount"
            handleChange={handleChange}
          />
          <Button
            handleClick={handleSubmit}
            disabled={isGettingInfo}
            showLoader={isGettingInfo}
            text="Request for Settelment"
          />
        </Drawer>
      </div>
    </>
  );
};

export default SettlementForm;
