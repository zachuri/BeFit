import Link from 'next/link';
import React from 'react';
import { MainLayoutHeightScreen } from '../components/layouts/Main';

const NotFound = () => {
  return (
    <MainLayoutHeightScreen>
      <div className="flex flex-col items-center justify-center mx-10">
        <h1 className="text-4xl">Not Found</h1>
        <p className="mt-5 text-xs md:text-base">The page you&apos;re looking for was not found</p>

        <hr className="mt-5 border w-full" />

        <div className="mt-5">
          <Link href="/">
            <button className="rounded p-1 border border-black dark:border-white">
              Return Home
            </button>
          </Link>
        </div>
      </div>
    </MainLayoutHeightScreen>
  );
};

export default NotFound;
