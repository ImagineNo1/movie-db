import Footer from "./footer";
import Navbar from "./navbar";

type layoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: layoutProps) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
