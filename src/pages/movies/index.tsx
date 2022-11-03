import {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import Link from "next/link";
import { data } from "../../types/types";
import { genres } from "../../components/genres";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Movies({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const imageUrl = "https://image.tmdb.org/t/p/w220_and_h330_face";
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState<data>(data);
  let selected: string[] = [];
  const router = useRouter();

  const handleClick = (name: string) => {
    if (selected.includes(name)) {
      selected = selected.filter((item) => item !== name);
    } else if (!selected.includes(name)) {
      selected.push(name);
    }
    console.log(selected);
  };

  return (
    <>
      <Head>
        <title>The Movie DB | Movies</title>
        <meta name="description" content="watch latest movies in the 2022 !" />
      </Head>
      <div className=" bg-purple-200">
        <div className="text-md grid lg:grid-cols-Movies">
          {/* start Of sidebar  */}

          <div className="bg-purple-300 p-4 rounded-lg box-border">
            <p className="text-left font-extralight text-3xl ">Filters : </p>

            <input
              onChange={async (e) => {
                const result = await fetch(
                  `https://api.themoviedb.org/3/search/movie?api_key=1cf50e6248dc270629e802686245c2c8&query=${e.target.value}`
                );
                if (result.ok) {
                  const res: data = await result.json();
                  setMovies(res);
                  router.push(`/movies?search=${e.target.value}`, undefined, {
                    shallow: true,
                  });
                }
              }}
              type="text"
              placeholder="Search between all movies "
              className="rounded-base mt-2 py-1 px-1 w-full  border-2 border-purple-400"
            />
            <p className="my-3 text-3xl">Genres :</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleClick("Action")}
                style={{
                  borderColor: selected.includes("Action" as string)
                    ? "red"
                    : "green",
                }}
                className={`py-1 px-2 rounded-md border-2 border-blue-500 hover:bg-blue-400 hover:text-white`}
              >
                Action
              </button>
              <button
                onClick={() => handleClick("Comedy")}
                className="py-1 px-2 rounded-md border-2 border-blue-500 hover:bg-blue-400 hover:text-white"
              >
                Comedy
              </button>
              <button
                onClick={() => handleClick("Animation")}
                className="py-1 px-2 rounded-md border-2 border-blue-500 hover:bg-blue-400 hover:text-white"
              >
                Animation
              </button>
              <button
                onClick={() => handleClick("Drama")}
                className="py-1 px-2 rounded-md border-2 border-blue-500 hover:bg-blue-400 hover:text-white"
              >
                Drama
              </button>
              <button
                onClick={() => handleClick("History")}
                className="py-1 px-2 rounded-md border-2 border-blue-500 hover:bg-blue-400 hover:text-white"
              >
                History
              </button>
              <button
                onClick={() => handleClick("TV Movie")}
                className="py-1 px-2 rounded-md border-2 border-blue-500 hover:bg-blue-400 hover:text-white"
              >
                TV Movie
              </button>
              <button
                onClick={() => handleClick("War")}
                className="py-1 px-2 rounded-md border-2 border-blue-500 hover:bg-blue-400 hover:text-white"
              >
                War
              </button>
            </div>
          </div>

          {/* End of Side Bar  */}

          <div className="container mx-auto w-95 grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 justify-items-center auto-rows-fr gap-2 pt-4 ">
            {movies.results.map((movie) => {
              // movie.genre_ids.forEach((id) => setGenres());
              return (
                <Link href={`/movies/${movie.id}`} key={movie.id}>
                  <div className="text-white bg-gray-600 text-lg rounded inline-block hover:shadow-lg hover:opacity-80">
                    <img
                      src={`${imageUrl}${movie.poster_path}`}
                      alt={movie.original_title}
                      className="rounded-md"
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

export const getServerSideProps: GetServerSideProps<{
  data: data;
}> = async (context) => {
  const { query } = context;
  const { search } = query;
  let res: Response;
  if (search) {
    res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=1cf50e6248dc270629e802686245c2c8&query=${search}`
    );
  } else {
    res = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?sort_by=popularity.desc&api_key=${process.env.API_KEY}&language=en-US&page=1`
    );
  }

  const data: data = await res.json();

  return {
    props: {
      data,
    },
  };
};
