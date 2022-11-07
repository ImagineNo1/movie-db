import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>Feel The Code | Home</title>
        <meta name="description" content="Feel The Code Movie DB" />
      </Head>

      <div className=" bg-purple-200">
        <div className="container mx-auto w-11/12 text-md">
          <div className="h-screen flex justify-center items-center ">
            <div>
              <p className="text-6xl lg:text-7xl font-style">The Movie DB</p>
              <p className="lg:text-3xl text-xl font-extralight">
                &gt;&gt; Go To Movie Page
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
