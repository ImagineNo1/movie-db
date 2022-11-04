import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import { movie } from "../../types/types";
import Head from "next/head";

const MovieDetails = ({
  movie,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const imageUrl = "https://image.tmdb.org/t/p/w220_and_h330_face";

  return (
    <>
      <Head>
        <title>{movie.original_title} | Details</title>
        <meta name="description" content={`Overview : ${movie.overview}`} />
      </Head>
      {movie && (
        <div className="flex justify-center items-center h-84vh">
          <div className="rounded-lg shadow-xl border-2 border-black cursor-pointer">
            {/* <p className="border border-red-400 rounded-lg px-2 py-1 inline text-red-400 hover:bg-red-500 hover:text-white cursor-pointer">
              Movie {movie.id}
            </p> */}
            <img
              src={`${imageUrl}${movie.poster_path}`}
              alt={movie.original_title}
            />
            <p className="text-center text-2xl my-5">
              Title : {movie.original_title}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetails;

// export const getStaticProps: GetStaticProps<{ movie: movie }> = async (
//   context
// ) => {
//   const { params } = context;
//   const result = await fetch(
//     `https://api.themoviedb.org/3/movie/${params?.movie}?api_key=${process.env.API_KEY}&language=en-US`
//   );
//   const movie: movie = await result.json();
//   return {
//     props: {
//       movie,
//     },
//   };
// };

export const getServerSideProps: GetServerSideProps<{ movie: movie }> = async (
  context
) => {
  const { params } = context;
  const result = await fetch(
    `https://api.themoviedb.org/3/movie/${params?.movie}?api_key=${process.env.API_KEY}&language=en-US`
  );
  const movie: movie = await result.json();
  return {
    props: {
      movie,
    },
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [
//       { params: { movie: "663712" } },
//       { params: { movie: "436270" } },
//       { params: { movie: "717728" } },
//     ],
//     fallback: true,
//   };
// };
