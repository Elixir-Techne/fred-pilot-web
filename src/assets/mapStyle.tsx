import type { GeoJSONSourceRaw, FillLayer, LineLayer } from "react-map-gl";

import MAP_STYLE from "../../map-style.json";

const sfNeighborhoods: GeoJSONSourceRaw = {
  type: "geojson",
  //   data:
  //     "https://raw.githubusercontent.com/uber/react-map-gl/master/examples/.data/feature-example-sf.json",
  //   data: {
  //     type: "FeatureCollection",
  //     features: [
  //       {
  //         geometry: {
  //           type: "Polygon",
  //           coordinates: [
  //             [
  //               [-122.391714, 37.793459],
  //               [-122.395714, 37.793459],
  //               [-122.395714, 37.795459],
  //               [-122.391714, 37.795459],
  //               [-122.391714, 37.793459],
  //             ],
  //           ],
  //         },
  //         id: "94105",
  //         properties: {
  //           id: 94105,
  //           neighborhood: "Rincon Hill",
  //         },
  //         type: "Feature",
  //       },
  //     ],
  //   },
};

const fillLayer: FillLayer = {
  id: "sf-neighborhoods-fill",
  source: "sf-neighborhoods",
  type: "fill",
  paint: {
    "fill-outline-color": "#0040c8",
    "fill-color": "#fff",
    "fill-opacity": 0,
  },
};

const lineLayer: LineLayer = {
  id: "sf-neighborhoods-outline",
  source: "sf-neighborhoods",
  type: "line",
  paint: {
    "line-width": 2,
    "line-color": "#ff0000",
  },
};

// Make a copy of the map style
export default {
  ...MAP_STYLE,
  sources: {
    ...MAP_STYLE.sources,
    ["sf-neighborhoods"]: sfNeighborhoods,
  },
  layers: [...MAP_STYLE.layers, fillLayer, lineLayer],
};
