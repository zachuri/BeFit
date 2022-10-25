import Head from 'next/head';
import { MainLayoutFlex } from '../components/layouts/Main';
import { AiFillCaretDown } from 'react-icons/ai';
// import LineGraph from '../components/LineGraph';
import Link from 'next/link';
import { trpc } from '../utils/trpc';
import LoadingIcon from '../components/LoadingIcon';
import LineGraph from '../components/LineGraph';
import SessionAuth from '../components/SessionAuth';
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
  const { data, isLoading } = trpc.useQuery(['weights.getRecentWeight']);

  return (
    <>
      <Head>
        <title>BeFit</title>
        <meta name="app tracker for body goals" content="Let's get fit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SessionAuth pageName="Home Page">
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
      </SessionAuth>
    </>
  );
};

export default Home;
