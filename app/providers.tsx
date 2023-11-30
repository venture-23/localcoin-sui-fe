import { createContext } from 'react';

// Define a TypeScript interface for your context data
interface MyContextData {
  value?: string;
  showPinLockScreen?: boolean;
  setshowPinScreen?: any;
}

// Create a context with an initial value
const MyContext = createContext<MyContextData | undefined>(undefined);

export { MyContext };
