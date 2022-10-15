import Head from 'next/head';
import {
  MainLayoutFlex,
  MainLayoutHeightScreen
} from '../components/layouts/Main';
import { AiFillCaretDown } from 'react-icons/ai';
// import LineGraph from '../components/LineGraph';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { trpc } from '../utils/trpc';
import LoadingIcon from '../components/LoadingIcon';
import LineGraph from '../components/LineGraph';
// import { trpc } from "../utils/trpc";

const NavigateLinks = () => {
  return (
    <div className="text-center text-2xl mt-5 p-2 grid grid-cols-2 gap-5">
      <Link href="/progress">
        <div className="p-10 border rounded border-black dark:border-white hover:border-[#00C804] hover:dark:border-[#00C804]">
          <button>Progress</button>
        </div>
      </Link>

      <Link href="/workouts">
        <div className="p-10 border rounded border-black dark:border-white hover:border-[#00C804] hover:dark:border-[#00C804]">
          <button>Workouts</button>
        </div>
      </Link>

      <Link href="/diet">
        <div className="p-10 border rounded border-black dark:border-white hover:border-[#00C804] hover:dark:border-[#00C804]">
          <button>Diet</button>
        </div>
      </Link>

      <Link href="/weight">
        <div className="p-10 border rounded border-black dark:border-white hover:border-[#00C804] hover:dark:border-[#00C804]">
          <button>Weight</button>
        </div>
      </Link>
    </div>
  );
};

const Home = () => {
  // Using Next-Auth Session -> check weather the user is signed in
  const { status } = useSession();

  const { data, isLoading } = trpc.useQuery(['weights.getRecentWeight']);

  return (
    <>
      <Head>
        <title>BeFit</title>
        <meta name="app tracker for body goals" content="Let's get fit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
          </div>
        </MainLayoutHeightScreen>
      ) : (
        <MainLayoutFlex>
          {/* Current Weight of User  */}
          <div className="mt-5 mx-20 text-center">
            <h1 className="text-5xl">Current Weight</h1>
            {isLoading && (
              <div>
                {/* Loading Weight */}
                <LoadingIcon />
              </div>
            )}
            <h2 className="text-4xl">{data?.weightTotal} LBS</h2>
          </div>

          {/* Total weight up or down */}
          <div className="flex flex-row justify-between mt-5 mx-10 text-s">
            {/* Shows users progression */}
            <div className="flex items-center justify-center fill-[#00C804] text-[#00C804]">
              <AiFillCaretDown className="mr-2" />
              <p className="">20 LBS (9.23%)</p>
            </div>

            {/* Show their progress within a time period */}
            <p>Past Month</p>
          </div>

          {/* Graph of Progress */}
          <div className="mt-5">
            <LineGraph />
          </div>

          {/* Navigation Links */}
          <NavigateLinks />
        </MainLayoutFlex>
      )}
    </>
  );
};

export default Home;
