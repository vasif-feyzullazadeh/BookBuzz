export interface IGenericProduct {
  id?: number;
  images: [];
  mainImage: string;
  numOfLikes: number;
  price: number;
  subtitleShort: string;
  title: string;
}

export interface IProducts<T> {
  products: T;
}
