import fs from "fs/promises";
import { User } from "../types/userInterface";


const filePath = "./database/users.json";

export const readUser = async (): Promise<User[]> => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data) as User[];
};

export const writeUser = async (data: User[]): Promise<void> => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};