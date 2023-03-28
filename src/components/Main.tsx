import React from 'react';

interface MainProps {
  children: React.ReactNode;
}

function Main({ children }: MainProps) {
  return <main className='pt-[60px] flex flex-col flex-grow'>{children}</main>;
}

export default Main;
