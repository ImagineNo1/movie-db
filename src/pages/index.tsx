import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>Feel The Code | Home</title>
        <meta name="description" content="Feel The Code Movie DB" />
      </Head>

      <div className=" bg-gray-100">
        <div className="container mx-auto w-11/12 text-md">
          <div className="h-screen flex justify-center items-center text-6xl lg:text-7xl font-style">
            The Movie DB
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
