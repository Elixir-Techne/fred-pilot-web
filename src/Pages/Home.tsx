// @ts-nocheck
import { Autocomplete, Box, Button, CircularProgress, TextField } from "@mui/material";
import { useRef, useState } from "react";
import ReactMapGl, { MapRef } from "react-map-gl";
import { getGeocoder, getBoundingBox } from "../api";
import { useNavigate } from "react-router";

const accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const Home = () => {
  const navigate = useNavigate();
  const [viewport, setViewport] = useState({
    latitude: 70.782223,
    longitude: 22.308927,
    zoom: 10,
  });
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchedValue, setSearchedValue] = useState({});

  const mapRef = useRef<MapRef>();

  const handleGeocoder = (e) => {
    setLoading(true);
    const params = {
      types: "address",
      limit: 10,
      access_token: accessToken,
    };
    getGeocoder(inputValue, params)
      .then((res) => {
        setOptions(
          res?.data?.features.map((feature) => ({
            label: feature.place_name,
            ...feature,
          }))
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleClick = () => {
    const option = options.find((opt) => opt.label === inputValue);
    setSearchedValue(option);
    const [longitude, latitude] = option?.center;
    mapRef.current?.flyTo({ center: [longitude, latitude], duration: 2000 });
    getBoundingBox({
      latitude,
      longitude,
      building_id: "",
    }).then((res) => {
      const { data } = res;
      if (Array.isArray(data) && data.length > 0) {
        const [placeData] = data;
        navigate({ pathname: "/searched-info", search: `polygone=${placeData?.Shape_Area || ""}` });
      }
    });

    // setviewPort((prev) => {
    //   return { ...prev, latitude, longitude };
    // });
  };

  return (
    <>
      <ReactMapGl
        ref={mapRef}
        initialViewState={viewport}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        // onViewPortChange={(viewport) => setViewport(viewport)}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        // dragPan={false}
        // scrollZoom={false}
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
