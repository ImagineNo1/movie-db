import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { data } from "../../types/types";

export default function Movies({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const imageUrl = "https://image.tmdb.org/t/p/w220_and_h330_face";

  return (
    <>
      <Head>
        <title>The Movie DB | Movies</title>
      </Head>
      <div className=" bg-gray-100">
        <div className="container mx-auto w-11/12 text-md">
          <div className="pt-2 flex justify-start gap-4 flex-wrap">
            {data.results.map((movie) => {
              return (
                <Link href={`/movies/${movie.id}`} key={movie.id}>
                  <div className="text-white bg-gray-600 text-lg rounded inline-block">
                    <img
                      src={`${imageUrl}${movie.poster_path}`}
                      alt={movie.original_title}
                    />
                    <p className="text-center p-3">{movie.original_title}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<{ data: data }> = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?api_key=7fa164084e58e9cab61ed06d4f2037b8&language=en-US&page=1"
  );
  const data: data = await res.json();

  return {
    props: {
      data,
    },
  };
};
