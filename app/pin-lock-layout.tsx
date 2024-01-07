'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { MyContext } from './providers';

export default function RootLayoutClient({ children }: React.PropsWithChildren) {
  const [showPinLockScreen, setShowPinScreen] = useState(false);
  const [userEnterPin, setUserEnterPin] = useState<any>('');
  const [checkPinCode, setCheckPinCode] = useState(false);
  const [redirectTo, setRedirectTo] = useState(false);
  const [userInfo, setUserInfo] = useState<any>({});

  const router = useRouter();
  // useEffect(() => {
  //   const res = getLocalStorageValue('local-coin');
  //   if (res) {
  //     // setShowPinScreen(true);
  //     // setCheckPinCode(true);
  //     // setRedirectTo(true);
  //   } else {
  //     // router.push('/');
  //   }
  // }, []);

  return (
    <MyContext.Provider
      value={{
        setShowPinScreen,
        setUserEnterPin,
        setCheckPinCode,
        setRedirectTo,
        userEnterPin,
        setUserInfo,
        userInfo,
        redirectTo,
        checkPinCode
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
