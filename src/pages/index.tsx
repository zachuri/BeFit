import type { NextPage } from 'next';
import Head from 'next/head';
import MainLayout from '../components/layouts/Main';
import { AiFillCaretDown } from 'react-icons/ai';
// import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  return (
    <>
      <Head>
        <title>BeFit</title>
        <meta name="app tracker for body goals" content="Let's get fit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <div className="flex flex-col mt-20">
          <div className="mt-5 mx-20 text-center">
            <h1 className="text-5xl">Current </h1>
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
          <div></div>
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
