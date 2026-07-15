

import axios from "axios";

// Create an axios instance with the backend base URL
export const axiosInstance = axios.create({
  baseURL: "https://workerhelp.vercel.app",
});

// Generic API connector function
export const apiConnector = (method, url, bodyData, headers, params) => {
  console.log("API Call:", method, url, bodyData, headers, params);

  return axiosInstance({
    method, // no need for template literals
    url,    // no need for template literals
    data: bodyData || undefined,       // send undefined if no body
    headers: headers || undefined,     // send undefined if no headers
    params: params || undefined,       // send undefined if no params
  });
};
