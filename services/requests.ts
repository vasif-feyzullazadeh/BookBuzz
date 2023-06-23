import { GenericProduct, IProducts } from "./../types/globalTypes";
import axios from "axios";
import { BASE_URL } from "./api";

const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Access-Control-Allow-Origin": "*",
  'Access-Control-Allow-Credentials': true
}

interface ISearchProduct<T> {
  products: T[];
}

const auth = {
  login: async (params: any) => {
    const res = await axios.post(`${BASE_URL}/account/login`, {
      ...params
    }, {
      headers
    });

    return res.data;
  },
};

const products = {
  getProducts: async (params?: any) => {
    const res = await axios.get<IProducts<GenericProduct>>(
      "https://dummyjson.com/products",
      {
        params: {
          limit: !!params?.queryKey[1].limit ? params?.queryKey[1].limit : "0",
          skip: !!params?.queryKey[1].skip ? params?.queryKey[1].skip : "0",
          select: !!params?.queryKey[1].select
            ? params?.queryKey[1].select
            : "",
        },
      }
    );
    return res.data;
  },

  getProduct: async (param: any) => {
    const res = await axios.get(
      `https://dummyjson.com/products/${param.queryKey[1] !== "" && param.queryKey[1] !== undefined
        ? param.queryKey[1]
        : "1"
      }`
    );
    return res.data;
  },

  addProduct: async (params: GenericProduct) => {
    const res = await axios.post(
      `https://dummyjson.com/products/add`,
      {
        ...params,
      },
      {
        headers: {
          // Authorization: "Bearer I74lzxcXLD0DP6VCi5E0IvzKu39RHskocajPvNcf",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  },

  updateProduct: async (data: GenericProduct) => {
    const res = await axios.put(
      `https://dummyjson.com/products/${data.id}`,
      {
        ...data,
      },
      {
        headers: {
          // Authorization: "Bearer I74lzxcXLD0DP6VCi5E0IvzKu39RHskocajPvNcf",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  },

  deleteProduct: async (id: any) => {
    const res = await axios.delete(`https://dummyjson.com/products/${id}`, {
      headers: {
        // Authorization: "Bearer I74lzxcXLD0DP6VCi5E0IvzKu39RHskocajPvNcf",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.data;
  },

  searchProducts: async (param: any) => {
    const res = await axios.get<ISearchProduct<GenericProduct>>(
      "https://dummyjson.com/products/search",
      {
        params: {
          q: param.queryKey[1],
        },
      }
    );
    return res.data;
  },

  searchProductsMutation: async (param: { q: string | null }) => {
    const res = await axios.get<ISearchProduct<GenericProduct>>(
      `https://dummyjson.com/products/search`,
      {
        params: param,
      }
    );
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
