'use client';
import { useAuthCallback, useEnokiFlow, useZkLogin } from '@mysten/enoki/react';
import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { APP_NETWORK } from 'utils/sui';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

interface LoginContextType {
  isLoggedIn: boolean;
  userDetails: UserDetails;
  showSuccessScreen: boolean;
  login: () => void;
  logOut: () => void;
  setShowSuccessScreen: React.Dispatch<React.SetStateAction<boolean>>;
  isGoogleScreenLoading: boolean;
}

export const LoginContext = createContext<LoginContextType | undefined>(undefined);

interface UserDetails {
  provider: string;
  salt: string;
  address: string;
}

interface LoginProviderProps {
  children: ReactNode;
}

const InitUserDetails = {
  provider: '',
  salt: '',
  address: ''
};

export const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const flow = useEnokiFlow();
  const zkLogin = useZkLogin();
  useAuthCallback();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGoogleScreenLoading, setIsGoogleScreenLaoding] = useState(false)
  const [showSuccessScreen, setShowSuccessScreen] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails>(InitUserDetails);

  const login = async () => {
    setIsGoogleScreenLaoding(true)
    window.location.href = await flow.createAuthorizationURL({
      provider: 'google',
      clientId: GOOGLE_CLIENT_ID,
      redirectUrl: window.location.origin,
      network: APP_NETWORK
    });
    if(isLoggedIn) {
      setIsGoogleScreenLaoding(false)
    }
    
  };

  const logOut = async () => {
    flow.logout();
    clearStates();
  };

  const clearStates = () => {
    setIsLoggedIn(false);
    setUserDetails(InitUserDetails);
  };

  useEffect(() => {
    if (zkLogin.address && zkLogin.salt && zkLogin.provider) {
      setUserDetails({
        provider: zkLogin.provider,
        salt: zkLogin.salt,
        address: zkLogin.address
      });
      setIsLoggedIn(true);
      setShowSuccessScreen(true);
    }
  }, [zkLogin.address]);

  // useEffect(() => {
  //   if (!flow) return;
  //   flow.getKeypair().then((data) => {
  //     console.log('keypair', data);
  //   });
  //   // flow.getProof().then(() => {
  //   //   flow.getSession();
  //   // });
  // }, [flow]);

  const contextValue: LoginContextType = {
    isLoggedIn,
    userDetails,
    showSuccessScreen,
    login,
    logOut,
    setShowSuccessScreen,
    isGoogleScreenLoading
  };

  return <LoginContext.Provider value={contextValue}>{children}</LoginContext.Provider>;
};
