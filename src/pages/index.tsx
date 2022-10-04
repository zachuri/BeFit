import type { NextPage } from 'next';
import Head from 'next/head';
import {
  MainLayoutFlex,
  MainLayoutHeightScreen
} from '../components/layouts/Main';
import { AiFillCaretDown } from 'react-icons/ai';
import LineGraph from '../components/LineGraph';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
// import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>BeFit</title>
        <meta name="app tracker for body goals" content="Let's get fit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!session ? (
        <MainLayoutHeightScreen>
          <div className="flex flex-col text-center">
            <h1 className="text-2xl">Please Sign in</h1>
            <p className="">In order to view your progress</p>
          </div>
        </MainLayoutHeightScreen>
      ) : (
        <MainLayoutFlex>
          {/* Current Weight of User  */}
          <div className="mt-5 mx-20 text-center">
            <h1 className="text-5xl">Current Weight</h1>
            <h2 className="text-4xl">210 LBS</h2>
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

          <div className="text-center text-2xl mt-5 p-2 grid grid-cols-2 gap-5">
            <Link href="/progress">
              <div className="p-10 border rounded border-black dark:border-white hover:border-[#00C804] hover:dark:border-[#00C804]">
                <button>Progress</button>
              </div>
            </Link>

            <Link href="/exercise">
              <div className="p-10 border rounded border-black dark:border-white hover:border-[#00C804] hover:dark:border-[#00C804]">
                <button>Exercise</button>
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
        </MainLayoutFlex>
      )}
    </>
  );
};

export default Home;
