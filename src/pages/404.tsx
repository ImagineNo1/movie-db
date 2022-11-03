import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, []);
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
          <p className="mt-3">Redirecting in 3 Seconds</p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
