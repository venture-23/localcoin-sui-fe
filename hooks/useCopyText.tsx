import { toast } from 'react-toastify';

import React from 'react';

interface Props {
  showToast?: any;
  setTimeOut?: any;
  message?: any;
}

const useHandleCopy = (props?: Props) => {
  const [isCopied, setIsCopied] = React.useState<any>(false);
  const handleCopy: any = async (promoCode: string, message = 'copied successfully') => {
    console.log({ props, promoCode });
    try {
      if (!isCopied) {
        await navigator.clipboard.writeText(promoCode);
        setIsCopied(true);
        props?.showToast &&
          toast.success(message, {
            toastId: 'success'
          });
        const timer = setTimeout(() => setIsCopied(false), props?.setTimeOut || 3000);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.log('failed to copy');
    }
  };

  return [isCopied, handleCopy];
};

export default useHandleCopy;
