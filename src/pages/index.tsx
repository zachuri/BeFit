import type { NextPage } from 'next';
import Head from 'next/head';
import MainLayout from '../components/layouts/Main';
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
        <div className="flex flex-col">
          <h1 className="text-4xl">Current Weight</h1>
          <h2 className="text-2xl">210 LBS</h2>
          {/* Total weight up or down */}
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
