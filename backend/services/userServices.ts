import fs from "fs/promises";
import { User } from "../types/userInterface";


const filePath = "./database/users.json";
// In line 7, the async function is being typed, telling it to return a promise and that it will be an object of type User.
export const readUser = async (): Promise<User[]> => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data) as User[];
};
// In line 12, the async function is given a data parameter that will be of type User, and the promise will not return any data.
export const writeUser = async (data: User[]): Promise<void> => {
  // data is the User interface, null means that nothing will be filtered and all properties will be saved, and 2 will be the spacing.
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};