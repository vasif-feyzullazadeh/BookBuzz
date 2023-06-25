import axios from "axios";
import { BASE_URL } from "./api";
import { parseCookies } from "nookies";
import { getAxiosConfig } from "@/services/index";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};

const cookies = parseCookies();
const authCookie = cookies.auth;

const auth = {
  login: async (params: any) => {
    const res = await axios.post(
      `${BASE_URL}/account/login`,
      {
        ...params,
      },
      {
        headers,
      }
    );

    return res.data;
  },
};

const products = {
  getProducts: async (params?: any) => {
    const res = await axios.get(`${BASE_URL}/product/explore`, {
      headers: {
        Authorization: "Bearer " + authCookie,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.data;
  },

  getProduct: async (param: any) => {
    const res = await axios.get(
      `https://dummyjson.com/products/${
        param.queryKey[1] !== "" && param.queryKey[1] !== undefined
          ? param.queryKey[1]
          : "1"
      }`
    );
    return res.data;
  },

  searchProducts: async (param: any) => {
    const res = await axios.get("https://dummyjson.com/products/search", {
      params: {
        q: param.queryKey[1],
      },
    });
    return res.data;
  },

  searchProductsMutation: async (param: { q: string | null }) => {
    const res = await axios.get(`https://dummyjson.com/products/search`, {
      params: param,
    });
    return res.data;
  },
};

const users = {
  getUser: async (params: any) => {
    const res = await axios.get(`${BASE_URL}/account/login`);

    return res.data;
  },
};

export { auth, products, users };
