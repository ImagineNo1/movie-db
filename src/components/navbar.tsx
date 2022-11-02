import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-gray-200 h-16">
      <div className="flex justify-between items-center h-full container mx-auto w-11/12">
        <div>
          <Link
            href="/"
            className="md:text-6xl sm:text-5xl text-2xl font-style"
          >
            The Movie Database
          </Link>
        </div>
        <div className="text-lg">
          <Link
            href="/login"
            className="mr-4 border-b-2 hover:border-red-500 hover:text-red-600"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="mr-4 border-b-2 hover:border-red-500  hover:text-red-600"
          >
            Signup
          </Link>
          <Link
            href="/movies"
            className="border-b-2 hover:border-red-500  hover:text-red-600"
          >
            Movies
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
