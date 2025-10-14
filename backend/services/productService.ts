import fs from "fs/promises";
import { Product } from "../types/productInterface";


const filePath = "./database/product.json";

export const readProduct = async (): Promise<Product[]> => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data) as Product[];
};

export const writeProduct = async (data: Product[]): Promise<void> => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};