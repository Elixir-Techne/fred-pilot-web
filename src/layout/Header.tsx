import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const Header = () => {
  const [value, setValue] = React.useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      m={2.5}
      mx={6}
      alignItems="center"
    >
      <Box color="#da652e" component="h3">
        Mitigrate
      </Box>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        sx={{ width: "fit-content" }}
        TabIndicatorProps={{
          style: {
            backgroundColor: "#da652e",
          },
        }}
      >
        <LinkTab label="MITIGATION TOOL" href="/" />
        <LinkTab label="ABOUT US" href="/" />
        <LinkTab label="RESPNOSIBILITY" href="/" />
        <LinkTab label="INVESTORS" href="/" />
        <LinkTab label="SUPPLIRES" href="/" />
        <LinkTab label="MEDIA & EVENTS" href="/" />
        <LinkTab label="CONTECT US" href="/" />
        <LinkTab label="PUBLICATIONS" href="/" />
        <LinkTab label="CARRERS" href="/" />
      </Tabs>
    </Box>
  );
};

export default Header;
