// @ts-nocheck
import React, { useState } from "react";
import {
  Autocomplete,
  Button,
  CircularProgress,
  createFilterOptions,
  TextField,
} from "@mui/material";
import { getGeocoder, getBoundingBox } from "../../api";
import { useNavigate } from "react-router-dom";

const filter = createFilterOptions();
const accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const AutocompleteContainer = ({ mapRef }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchedValue, setSearchedValue] = useState(null);

  const handleGeocoder = (data) => {
    setInputValue(data);
    setLoading(true);
    const params = {
      types: "address",
      limit: 10,
      access_token: accessToken,
    };
    getGeocoder(data, params)
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

  const onChange = (value) => {
    setSearchedValue(value);
  };

  const handleClick = () => {
    let params = {};
    if (parseInt(searchedValue?.label)) {
      params = {
        building_id: searchedValue.label,
      };
    } else {
      const [longitude, latitude] = searchedValue?.center;
      if (mapRef) {
        mapRef.current?.flyTo({ center: [longitude, latitude], duration: 2000 });
      }
      params = {
        latitude: "59.23849157",
        longitude: "10.97403512",
      };
    }

    getBoundingBox(params).then((res) => {
      const { data } = res;
      if (Array.isArray(data) && data.length > 0) {
        const [placeData] = data;
        navigate({ pathname: "/searched-info", search: `polygone=${placeData?.Shape_Area || ""}` });
      }
    });
  };
  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        value={searchedValue}
        sx={{ width: 500, background: "#FFF" }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          handleGeocoder(newInputValue);
        }}
        onChange={(e, value) => {
          if (typeof value === "string") {
            onChange({
              label: value,
            });
          } else if (value && value.inputValue) {
            // Create a new value from the user input
            onChange({
              label: value.inputValue,
            });
          } else {
            onChange(value);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option.title);
          if (inputValue !== "" && !!parseInt(inputValue) && !isExisting) {
            filtered.push({
              inputValue,
              label: `Search with Building "${inputValue}"`,
            });
          }

          return filtered;
        }}
        getOptionLabel={(x) => x.label}
        isOptionEqualToValue={(option, value) => {
          return option.id === value.id;
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Loacation"
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
        sx={{ mx: 2, height: "42px", backgroundColor: "#da652e" }}
        onClick={handleClick}
      >
        Search
      </Button>
    </>
  );
};

export default AutocompleteContainer;
