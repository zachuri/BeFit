import { useSession } from 'next-auth/react';
import React from 'react';
import { MainLayoutHeightScreen } from './layouts/Main';
import LoadingIcon from './LoadingIcon';

interface Props {
  children: React.ReactNode;
  pageName: string;
  isLoading?: boolean;
}

const SessionAuth: React.FC<Props> = ({ children, pageName, isLoading }) => {
  // Using Next-Auth Session -> check weather the user is signed in
  const { status } = useSession();

  return (
    <>
      {status === 'unauthenticated' ? (
        <MainLayoutHeightScreen>
          <div className="min-h-screen flex items-center justify-center -mt-10 md:-mt-20">
            <div className="flex flex-col text-center">
              <h1 className="text-4xl">{pageName}</h1>
              <p className="text-2xl text-gray-700">Please Sign in!</p>
            </div>
          </div>
        </MainLayoutHeightScreen>
      ) : status === 'loading' || isLoading ? (
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
