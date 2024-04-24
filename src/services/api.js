import axios from 'axios';
import { BASE_URL_API } from "../helper/constants";

// Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: BASE_URL_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Common function for fetching data
const fetchData = async (url, method = 'get', data = null) => {
    const response = await axiosInstance({
      method,
      url,
      data,
    });

    return response
};

export default fetchData
