// export interface ProductDetails {
//   id: number;
//   title: string;
//   description: string;
//   price: string;
//   discountPercentage: number;
//   rating: number;
//   stock: number;
//   brand: string;
//   category: string;
//   thumbnail: string;
//   images: [];
// }

export interface GenericProduct {
  id?: number;
  title: string;
  description: string;
  price: string;
  discountPercentage: number | null;
  rating: number | null;
  stock: number | null;
  brand: string;
  category: string;
  thumbnail: string;
  images: [];
}

export interface IProducts<T> {
  products: T[];
  total?: number;
  skip?: number;
  limit?: number;
}

export interface IProductDetails<T> {
  products: T;
}
