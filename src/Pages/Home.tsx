// @ts-nocheck
import { Box } from "@mui/material";
import { useRef, useState } from "react";
import ReactMapGl, { MapRef } from "react-map-gl";

import AutocompleteContainer from "../components/Autocomplete";

const Home = () => {
  const [viewport, setViewport] = useState({
    latitude: 59.9139,
    longitude: 10.7522,
    zoom: 10,
  });

  const mapRef = useRef<MapRef>();

  return (
    <Box height="calc(100vh - 200px)">
      <ReactMapGl
        ref={mapRef}
        initialViewState={viewport}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        scrollZoom={false}
        dragPan={false}
      ></ReactMapGl>
      <Box
        display="flex"
        position="absolute"
        width="100%"
        justifyContent="center"
        top="300px"
        alignItems="center"
      >
        <AutocompleteContainer mapRef={mapRef} />
      </Box>
    </Box>
  );
};

export default Home;
