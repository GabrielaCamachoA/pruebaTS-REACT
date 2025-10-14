import { Request, Response } from "express";
import { readProduct, writeProduct } from "../services/productService";
import { Product } from "../types/productInterface";

// 6Obtener todos los productos
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  const products: Product[] = await readProduct();
  res.json(products);
};

// Crear un nuevo producto
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const products: Product[] = await readProduct();
  const skuExists = products.some(p => p.SKU === req.body.SKU);
  if (skuExists) {
    res.status(400).json({ message: "❌ El SKU ya existe" });
  }
  const newProduct: Product = { 
    id: Date.now(), 
    ...req.body, 
    createdAt: new Date() 
  };
  products.push(newProduct);
  await writeProduct(products);
  res.status(201).json(newProduct);
};

// Actualizar un producto existente
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const products: Product[] = await readProduct();
  const index = products.findIndex(p => p.id === Number(req.params.id));


  if (index === -1) {
    res.status(404).json({ message: "Producto no encontrado" });
    return;
  }

  products[index] = { ...products[index], ...req.body };
  await writeProduct(products);
  res.json(products[index]);
};

//  Eliminar un producto
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const products: Product[] = await readProduct();
  const filtered = products.filter(p => p.id === Number(req.params.id));
  await writeProduct(filtered);
  res.json({ message: "Producto eliminado" });
};
