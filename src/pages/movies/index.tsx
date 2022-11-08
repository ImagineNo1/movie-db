import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { data, MultipleChilds } from "../../types/types";
import { genres } from "../../components/genres";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Movies({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const imageUrl = "https://image.tmdb.org/t/p/w220_and_h330_face";
  const [movies, setMovies] = useState<data>(data);
  const [selected, setSelected] = useState<string[]>([]);
  const [ratingval, setRatingval] = useState<number | string>(5);
  const [activefilters, seActivefilters] = useState<string[]>([]);
  const router = useRouter();

  // This Function Used For Search Button in side bar

  const handleSearch = async () => {
    let genresStr = "";
    let ratingStr = "";
    let routergenre = "";
    let routerRating = "";

    if (activefilters.includes("Genres")) {
      let genresCode: number[] = [];
      selected.map((genre) => {
        genres.map((item) => {
          if (item.name == genre) {
            genresCode.push(item.id);
          }
        });
      });
      genresStr = `&with_genres=${genresCode.map((code) => code)}`;
      routergenre = `&genres=${genresCode.map((code) => code)}`;
    }
    if (activefilters.includes("Rating")) {
      ratingStr = `&vote_count.gte=${ratingval}`;
      routerRating = `&rating=${ratingval}`;
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=7fa164084e58e9cab61ed06d4f2037b8&language=en-US&page=1${
        genresStr?.length > 1 ? genresStr : ""
      }${ratingStr?.length > 1 ? ratingStr : ""}`
    );
    if (!response.ok) {
      return;
    }
    const data: data = await response.json();
    setMovies(data);

    router.push(
      `/movies?${routergenre?.length > 1 ? routergenre : ""}${
        routerRating?.length > 1 ? routerRating : ""
      }`,
      undefined,
      {
        shallow: true,
      }
    );
  };

  // this Function used to consider which filters should apply for searching

  const ActiveFilters = (name: string) => {
    if (activefilters.includes(name)) {
      seActivefilters(activefilters.filter((item) => item !== name));
    } else if (!activefilters.includes(name)) {
      seActivefilters([...activefilters, name]);
    }
  };

  // this function just toggles the active and inactive Genres for searching

  const handleClick = (name: string) => {
    if (name == "Delete") {
      setSelected([]);
      return;
    }
    if (name != "Delete" && name != "Search") {
      if (selected.includes(name)) {
        setSelected(selected.filter((item) => item !== name));
      } else if (!selected.includes(name)) {
        setSelected([...selected, name]);
      }
    }
  };

  return (
    <>
      <Head>
        <title>The Movie DB | Movies</title>
        <meta name="description" content="watch latest movies in the 2022 !" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" bg-purple-200">
        <div className="text-md grid lg:grid-cols-Movies">
          {/* start Of sidebar  */}

          <div className="bg-purple-300 p-4 rounded-lg box-border mt-4">
            <p className="text-left font-extralight text-3xl ">Filters : </p>

            <input
              onChange={async (e) => {
                const result = await fetch(
                  `https://api.themoviedb.org/3/search/movie?api_key=7fa164084e58e9cab61ed06d4f2037b8&query=${e.target.value}`
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
            <hr className="mt-4" />
            <p className="my-3 text-3xl">
              Genres :{" "}
              {selected.length >= 1 && (
                <span className="text-base">
                  Selected Genres :{" "}
                  {selected.map((genre, index) => (
                    <span key={index}> {genre} , </span>
                  ))}
                </span>
              )}
            </p>

            <MultipleChilds>
              <>
                <div className="grid grid-cols-3 gap-3">
                  {genres.map((genre) => {
                    return (
                      <button
                        key={genre.id}
                        onClick={() => handleClick(`${genre.name}`)}
                        style={{
                          borderColor: selected.includes(`${genre.name}`)
                            ? "green"
                            : "blue",
                        }}
                        className={`py-1 px-2 rounded-md border-2 border-blue-500 hover:bg-blue-400 hover:text-white ${
                          genre.name.length > 8 ? " text-sm" : "text-lg"
                        }`}
                      >
                        {genre.name}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => handleClick("Delete")}
                    className="py-1 px-2 rounded-md border-2 border-red-500 hover:bg-red-400 hover:text-white"
                  >
                    delete
                  </button>
                </div>
              </>
            </MultipleChilds>

            <p className="my-3 text-3xl">Rating :</p>
            <input
              type="range"
              min={0}
              max={10}
              step={1}
              onChange={(e) => {
                setRatingval(e.target.value);
              }}
            />
            <span className="ml-2 text-lg">{ratingval}</span>
            <hr className="mt-4" />
            <p className="my-3 text-3xl">Search : </p>
            <p className="my-4 font-extralight text-xl">Apply Filters :</p>
            <div className="grid grid-cols-3 gap-2 my-3">
              <button
                onClick={() => ActiveFilters("Genres")}
                style={{
                  borderColor: activefilters.includes("Genres" as string)
                    ? "green"
                    : "blue",
                }}
                className="px-3 py-2 rounded-md border-2 border-blue-600 hover:bg-blue-400 hover:text-white"
              >
                Genres
              </button>
              <button
                onClick={() => ActiveFilters("Rating")}
                style={{
                  borderColor: activefilters.includes("Rating" as string)
                    ? "green"
                    : "blue",
                }}
                className="px-3 py-2 rounded-md border-2 border-blue-600 hover:bg-blue-400 hover:text-white"
              >
                Rating
              </button>
            </div>
            <button
              onClick={handleSearch}
              className="py-1 px-5 rounded-md text-xl border-2 border-green-600 hover:bg-green-400 hover:text-white w-full"
            >
              Search
            </button>
          </div>

          {/* End of Side Bar  */}

          <div className="container mx-auto w-95 grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 justify-items-center auto-rows-fr gap-2 pt-4 ">
            {movies.results.map((movie) => {
              // movie.genre_ids.forEach((id) => setGenres());
              return (
                <div key={movie.id}>
                  <Link href={`/movies/${movie.id}`}>
                    <div className="text-white bg-gray-600 text-lg rounded inline-block hover:shadow-lg hover:opacity-80">
                      <img
                        src={`${imageUrl}${movie.poster_path}`}
                        alt={movie.original_title}
                        className="rounded-md"
                      />
                      <p className="text-center p-3">{movie.original_title}</p>
                    </div>
                  </Link>
                </div>
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
  const { genres } = query;
  const { rating } = query;
  let res: Response;

  if (search) {
    res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${search}`
    );
  } else {
    res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        process.env.API_KEY
      }&language=en-US&sort_by=popularity.desc${
        genres ? `&with_genres=${genres}` : ""
      }${rating ? `&vote_average.gte=${rating}` : ""}`
    );
  }

  const data: data = await res.json();

  return {
    props: {
      data,
    },
  };
};
