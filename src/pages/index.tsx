import type { NextPage } from "next";
import Head from "next/head";
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
    </>
  );
};

export default Home;