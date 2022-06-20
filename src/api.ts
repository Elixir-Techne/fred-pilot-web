import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://api.mapbox.com",
});

export const getGeocoder = async (searchWord: string, params: object) =>
  await axios.get(`geocoding/v5/mapbox.places/${searchWord}.json`, {
    params: params,
  });
