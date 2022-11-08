import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-purple-400 h-16 shadow-2xl">
      <div className="flex justify-between items-center h-full container mx-auto w-95">
        <div>
          <Link
            href="/"
            className="md:text-6xl sm:text-5xl text-4xl font-style"
          >
            The Movie Database
          </Link>
        </div>
        <div className="text-lg">
          <Link
            href="/about"
            className="mr-4 hover:border-b-2 hover:border-red-500  hover:text-red-600"
          >
            About
          </Link>
          <Link
            href="/movies"
            className="hover:border-b-2 hover:border-red-500  hover:text-red-600"
          >
            Movies
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
