/* eslint-disable unicorn/filename-case */
import { MyContext } from 'app/providers';
import { useContext } from 'react';

export function useMyContext() {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }

  return context;
}
