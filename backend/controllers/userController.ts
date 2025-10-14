import { Request, Response } from "express";
import { readUser, writeUser } from "../services/userServices";
import { User } from "../types/userInterface";

// 6Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users: User[] = await readUser();
  res.json(users);
};

// Crear un nuevo usuario
export const createUsers = async (req: Request, res: Response): Promise<void> => {
  const users: User[] = await readUser();
  const newUser: User = { 
    id: Date.now(), 
    ...req.body, 
    createdAt: new Date() 
  };
  users.push(newUser);
  await writeUser(users);
  res.status(201).json(newUser);
};

// Actualizar un usuario existente
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const users: User[] = await readUser();
  const index = users.findIndex(p => p.id === Number(req.params.id));


  if (index === -1) {
    res.status(404).json({ message: "Usuario no encontrado" });
    return;
  }

  users[index] = { ...users[index], ...req.body };
  await writeUser(users);
  res.json(users[index]);
};

//  Eliminar un usuario
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const users: User[] = await readUser();
  const filtered = users.filter(p => p.id === Number(req.params.id));
  await writeUser(filtered);
  res.json({ message: "Usuario eliminado" });
};

