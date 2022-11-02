import Head from "next/head";

const NotFound = () => {
  return (
    <>
      <Head>
        <title>404 | NotFound</title>
      </Head>
      <div className="flex justify-center items-center h-screen">
        <div>
          <p className="text-7xl font-style text-center">404</p>
          <p className="text-4xl font-extralight underline">
            The page You trying to find is Not available
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
