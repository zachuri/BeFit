import React from 'react';

interface mainProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<mainProps> = ({ children }) => {
  return (
    <main>
      <div className="flex flex-col justify-center items-center mt-10 md:mt-20 ">
        <div className="max-w-lg w-full">{children}</div>
      </div>
    </main>
  );
};

export default MainLayout;
