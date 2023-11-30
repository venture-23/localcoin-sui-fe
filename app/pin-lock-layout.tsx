'use client';

import PinLockScreen from 'components/pin-lock-screen';
import React, { useState } from 'react';
import { MyContext } from './providers';

export default function RootLayoutClient({ children }: React.PropsWithChildren) {
  const [showPinLockScreen, setshowPinScreen] = useState(false);
  return (
    <MyContext.Provider value={{ setshowPinScreen }}>
      {showPinLockScreen && <PinLockScreen />}
      {children}
    </MyContext.Provider>
  );
}
