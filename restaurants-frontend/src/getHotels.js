const axios = require("axios");

const axiosInstance = axios.create({
  headers: {
    "content-type": "application/json",
    "access-control-allow-headers": "*",
  },
});

const url = "http://localhost:5000/getHotels";

export const getHotels = () => axiosInstance.get(url);

export default getHotels;
