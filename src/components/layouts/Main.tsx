import React from 'react';

interface mainProps {
  children: React.ReactNode;
}

export const MainLayoutFlex: React.FC<mainProps> = ({ children }) => {
  return (
    <main>
      <div className="flex flex-col justify-center items-center mt-10 md:mt-20 ">
        <div className="max-w-lg w-full">{children}</div>
      </div>
    </main>
  );
};

export const MainLayoutHeightScreen: React.FC<mainProps> = ({ children }) => {
  return (
    <main>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-lg w-full">{children}</div>
      </div>
    </main>
  );
};
