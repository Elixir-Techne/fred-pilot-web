import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useState } from "react";
import ReactMapGl from "react-map-gl";
import { getGeocoder } from "../api";
import { useNavigate } from "react-router";

const accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const Home = () => {
  const navigate = useNavigate();
  const [viewPort, setviewPort] = useState({
    latitude: 59.9139,
    longitude: 10.7522,
    zoom: 10,
  });
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleGeocoder = (e) => {
    setLoading(true);
    const params = {
      types: "address",
      limit: 10,
      access_token: accessToken,
    };
    getGeocoder(e.target.value, params)
      .then((res) => {
        setOptions(
          res?.data?.features.map((feature) => ({
            label: feature.place_name,
            key: feature.id,
            geometry: feature.geometry,
          }))
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleClick = () => {
    const option = options.find((opt) => opt.label === inputValue);
    const coordinates = option?.geometry?.coordinates;
    navigate("searched-info");
  };

  return (
    <>
      <ReactMapGl
        initialViewState={viewPort}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        onViewPortChange={(viewport) => setviewPort(viewport)}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        dragPan={false}
        scrollZoom={false}
      ></ReactMapGl>
      <Box
        display="flex"
        position="absolute"
        width="100%"
        justifyContent="center"
        top="300px"
        alignItems="center"
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={options}
          sx={{ width: 500, background: "#FFF" }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Loacation"
              onChange={handleGeocoder}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : (
                      params.InputProps.endAdornment
                    )}
                  </>
                ),
              }}
            />
          )}
        />
        <Button
          variant="contained"
          size="small"
          sx={{ mx: 2, height: "42px" }}
          onClick={handleClick}
        >
          Search
        </Button>
      </Box>
    </>
  );
};

export default Home;
