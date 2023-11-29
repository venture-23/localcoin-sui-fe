import React, { ReactNode } from 'react';

type HeaderProps = {
  children: ReactNode; // This type allows anything that React can render
  className: any;
};

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <header className={`${className} flex items-center rounded-b-md bg-blue-500  text-white`}>
      <div className="container mx-auto ">{children}</div>
    </header>
  );
};

export default Header;
