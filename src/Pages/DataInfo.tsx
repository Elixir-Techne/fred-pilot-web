// @ts-nocheck
import { Box, Card, Grid, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import ReactMapGl from "react-map-gl";
import { Marker } from "react-map-gl";
import bbox from "@turf/bbox";
import LineTurf from "turf-linestring";
import queryString from "query-string";
import AutocompleteContainer from "../components/Autocomplete";
import { useLocation } from "react-router-dom";
import TableCard from "../components/TableCard";
import { rainFlood, climateForcast, riskReduction, propertyDetails } from "../utils/helpers";

const DataInfo = () => {
  const location = useLocation();
  const [coordinatesData, setCoordinatesData] = useState(null);
  const changesArrayValue = (data: any) => {
    return data.map((x) => {
      if (Array.isArray(x)) {
        return changesArrayValue(x);
      } else {
        return parseFloat(x);
      }
    });
  };

  const handleRefChange = useCallback(
    (node) => {
      // const testData =
      //   "SRID=4269;POLYGON ((10.9740691923595 59.238438059489, 10.9740227933371 59.2384118148634, 10.9739618408834 59.238440137309, 10.9739864838809 59.2384539566567, 10.9738577431111 59.2385136695373, 10.9738771411262 59.2385246938287, 10.9739431105353 59.2385619600357, 10.9739648580274 59.238574205259, 10.9741543790583 59.23848626153, 10.9741295513927 59.2384722665655, 10.9740691923595 59.238438059489))";
      const params = queryString.parse(location.search);
      if (params?.polygone) {
        var regExp = /.*\(\((.*)\)\)/;
        var matches = regExp.exec(params.polygone);

        const coordinates = (matches?.[1] || "").split(", ").map((x) => x.split(" "));
        const [longitude, latitude] = coordinates[0];
        setCoordinatesData({ latitude, longitude });

        const line = LineTurf(changesArrayValue(coordinates));
        const [minLng, minLat, maxLng, maxLat] = bbox(line);

        if (node) {
          node.fitBounds(
            [
              [minLng, minLat],
              [maxLng, maxLat],
            ],
            { padding: 40, duration: 1000, zoom: 18 }
          );
        }
      }
    },
    [location.search]
  );

  return (
    <Box sx={{ background: "#f1c9b7", padding: 10 }} color="#da652e">
      <Grid container spacing={2}>
        <Grid justifyContent="center" alignItems="center" display="flex" item sm={12}>
          <AutocompleteContainer />
        </Grid>
        <Grid item sm={5}>
          <Box pl={2}>
            <Typography sx={{ fontSize: "2rem" }}>Mapping</Typography>
          </Box>
          <Card sx={{ padding: 0, height: "700px" }}>
            <ReactMapGl
              ref={handleRefChange}
              initialViewState={{
                latitude: 37.78,
                longitude: -122.4,
                zoom: 18,
              }}
              mapStyle="mapbox://styles/mapbox/satellite-v9"
              // mapStyle={mapSyles as MapboxStyle}
              interactiveLayerIds={["sf-neighborhoods-fill"]}
              mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
            >
              {coordinatesData && (
                <Marker longitude={coordinatesData.longitude} latitude={coordinatesData.latitude} />
              )}
            </ReactMapGl>
          </Card>
        </Grid>
        <Grid item sm={7}>
          <Box pl={2}>
            <Typography sx={{ fontSize: "2rem" }}>Risks</Typography>
          </Box>
          <Grid container>
            <Grid item sm={6}>
              <TableCard
                title={"Heavy Rain-Flood Exposure"}
                columns={rainFlood.columns}
                data={rainFlood.data}
              />
            </Grid>
            <Grid item sm={6}>
              <TableCard
                title={"Climate forecast"}
                columns={climateForcast.columns}
                data={climateForcast.data}
              />
            </Grid>
            <Grid item sm={12}>
              <TableCard
                title={"Property Details"}
                columns={propertyDetails.columns}
                data={propertyDetails.data}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <Box pl={2}>
            <Typography sx={{ fontSize: "2rem" }}>Solutions</Typography>
          </Box>
          <TableCard
            title={"Risk Reduction Measures"}
            columns={riskReduction.columns}
            data={riskReduction.data}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataInfo;
