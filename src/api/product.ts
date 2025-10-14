// este archivo se encarga de hacer las peticiones HTTP a los productos

import axios from "axios";
import { GETProduct } from "../types/GetProducts";

const API_URL = "http://localhost:3000/api/products";


export const getProducts = async (): Promise<GETProduct[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};


export const creatProduct = async (product: Omit<GETProduct, "id" | "createdAt">): Promise<GETProduct> => {
  const res = await axios.post(API_URL, {
    ...product,
    createdAt: new Date().toISOString(),
  });
  return res.data;
};

export const updateProduct = async (id: number,  product: Omit<GETProduct, "id">): Promise<GETProduct> => {
  const res = await axios.put(`${API_URL}/${id}`, product);
  return res.data;
};

export const deleteProduct= async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

