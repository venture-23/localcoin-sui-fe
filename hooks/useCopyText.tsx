import { toast } from 'react-toastify';

import React from 'react';

interface Props {
  showToast?: any;
  setTimeOut?: any;
  message?: any;
}

const useHandleCopy = (props?: Props) => {
  const [isCopied, setIsCopied] = React.useState<any>(false);
  const handleCopy: any = async (content: string, message = 'Copied !!!') => {
    try {
      if (!isCopied) {
        await navigator.clipboard.writeText(content);
        setIsCopied(true);
        props?.showToast &&
          toast.success(message, {
            toastId: 'success',
            autoClose: 1000
          });
        const timer = setTimeout(() => setIsCopied(false), props?.setTimeOut || 300);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.log('failed to copy');
    }
  };

  return [isCopied, handleCopy];
};

export default useHandleCopy;
