import { createContext } from 'react';

// Define a TypeScript interface for your context data
interface MyContextData {
  value?: string;
  showPinLockScreen?: boolean;
  setshowPinScreen?: any;
  setUserEnterPin?: any;
  userEnterPin?: string;
  checkPinCode?: boolean;
  setCheckPinCode?: any;
  redirectTo?: any;
  setRedirectTo?: any;
  setUserInfo?: any;
  userInfo?: any;
}

// Create a context with an initial value
const MyContext = createContext<MyContextData | undefined>(undefined);

export { MyContext };
