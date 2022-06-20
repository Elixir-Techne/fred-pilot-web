import { Box } from "@mui/material";
import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

const DashBoard = () => {
  return (
    <Box display="flex" flexDirection="column" sx={{ height: "100%" }}>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default DashBoard;
