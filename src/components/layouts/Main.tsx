import React from 'react';

interface mainProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<mainProps> = ({ children }) => {
  return (
    <main>
      <div className="flex flex-col justify-center items-center px-10 pt-10 md:pt-20 ">
        <div className="max-w-lg flex-1 flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </main>
  );
};

export default MainLayout;
