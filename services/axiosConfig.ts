import axios, { AxiosError } from "axios";
import { BASE_URL } from "./api";
import { parseCookies, destroyCookie } from "nookies";

export const axiosConfig = {
  baseURL: BASE_URL,
  timeout: 100000,
  withCredentials: true,
};

interface Header {
  [index: string]: string;
}

const cookies = parseCookies();

export const getAxiosConfig = () => {
  const access_token = cookies.auth;

  const headers: Header = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (access_token) {
    headers["authorization"] = "Bearer " + access_token;
  }

  const instance = axios.create({
    ...axiosConfig,
    headers,
  });

  instance.interceptors.response.use(
    async (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        destroyCookie(null, "auth");

        window.location.replace("/login");
      }
      return Promise.reject(error);
    }
  );

  return instance;
};
