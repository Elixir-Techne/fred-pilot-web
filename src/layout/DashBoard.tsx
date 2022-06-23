import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

const DashBoard = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default DashBoard;
