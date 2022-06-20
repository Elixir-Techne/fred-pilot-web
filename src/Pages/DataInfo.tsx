import { Box, Card, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ReactMapGl from "react-map-gl";

const DataInfo = () => {
  const [viewPort, setviewPort] = useState({
    latitude: 59.9139,
    longitude: 10.7522,
    zoom: 19,
  });

  return (
    <Box
      height="100%"
      sx={{ background: "#f1c9b7", padding: 10 }}
      color="#da652e"
    >
      <Grid container spacing={2}>
        <Grid item sm={5}>
          <Card sx={{ padding: 0, height: "700px" }}>
            <ReactMapGl
              initialViewState={viewPort}
              mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              dragPan={false}
              scrollZoom={false}
            ></ReactMapGl>
          </Card>
        </Grid>
        <Grid item sm={7}>
          <Grid container>
            <Grid item sm={6}>
              <Card>
                <Typography variant="h5">Heavy Rain-Flood Exposure</Typography>
              </Card>
            </Grid>
            <Grid item sm={6}>
              <Card>
                <Typography variant="h5">Climate forecast</Typography>
              </Card>
            </Grid>
            <Grid item sm={12}>
              <Card>
                <Typography variant="h5">Property Details</Typography>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <Card>
            <Typography variant="h5">Risk Reduction Measures</Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataInfo;
