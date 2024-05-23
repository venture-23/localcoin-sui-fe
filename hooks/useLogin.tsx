import { LoginContext } from 'contexts';
import { useContext } from 'react';

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLogin must be used within LoginProvider');
  }
  return context;
};
