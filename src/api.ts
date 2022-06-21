import Axios from "axios";
import MapBoxAxios from "axios";

const axios = Axios.create({
  baseURL: "https://fred-pilot-api.herokuapp.com",
});

const mapBoxAxios = MapBoxAxios.create({
  baseURL: "https://api.mapbox.com",
});

export const getGeocoder = async (searchWord: string, params: object) =>
  await mapBoxAxios.get(`geocoding/v5/mapbox.places/${searchWord}.json`, {
    params: params,
  });

export const getBoundingBox = async (params: object) =>
  await axios.get(`/search`, {
    params: params,
  });
