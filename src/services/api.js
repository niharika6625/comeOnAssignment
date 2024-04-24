import axios from "axios";
import { BASE_URL_API } from "../helper/constants";

const axiosInstance = axios.create({
  baseURL: BASE_URL_API,
  headers: {
    "Content-Type": "application/json",
  },
});

const fetchData = async (url, method = "get", data = null) => {
  const response = await axiosInstance({
    method,
    url,
    data,
  });

  return response;
};

export default fetchData;
