import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { movie } from "../../types/types";

const MovieDetails = ({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const imageUrl = "https://image.tmdb.org/t/p/w220_and_h330_face";

  return (
    <>
      {movie && (
        <div className="flex justify-center items-center h-screen">
          <div className="w-7/12 mx-auto border border-blue-300 px-5 py-5 rounded">
            <p className="border border-red-400 rounded-lg px-2 py-1 inline text-red-400 hover:bg-red-500 hover:text-white cursor-pointer">
              Movie {movie.id}
            </p>
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

export const getStaticProps: GetStaticProps<{ movie: movie }> = async (
  context
) => {
  const { params } = context;
  const result = await fetch(
    `https://api.themoviedb.org/3/movie/${params?.movie}?api_key=7fa164084e58e9cab61ed06d4f2037b8&language=en-US`
  );
  const movie: movie = await result.json();
  return {
    props: {
      movie,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { movie: "663712" } },
      { params: { movie: "436270" } },
      { params: { movie: "717728" } },
    ],
    fallback: true,
  };
};
