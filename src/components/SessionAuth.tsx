import { useSession } from 'next-auth/react';
import React from 'react';
import { MainLayoutHeightScreen } from './layouts/Main';
import LoadingIcon from './LoadingIcon';

interface Props {
  children: React.ReactNode;
}

const SessionAuth: React.FC<Props> = ({ children }) => {
  const { status } = useSession();

  return (
    <>
      {status === 'unauthenticated' ? (
        <MainLayoutHeightScreen>
          <div className="min-h-screen flex items-center justify-center -mt-10 md:-mt-20">
            <div className="flex flex-col text-center">
              <h1 className="text-4xl">Home Page</h1>
              <p className="text-2xl text-gray-700">Please Sign in!</p>
            </div>
          </div>
        </MainLayoutHeightScreen>
      ) : status === 'loading' ? (
        <MainLayoutHeightScreen>
          <div className="flex flex-col text-center">
            <h1 className="text-2xl">Data is loading...</h1>
            <LoadingIcon />
          </div>
        </MainLayoutHeightScreen>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default SessionAuth;
