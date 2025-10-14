import axios from "axios";
import { GETUsers } from "../types/GetUsers";

const API_URL = "http://localhost:3000/api/users";


export const getUsers = async (): Promise<GETUsers[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addUser = async (user: Omit<GETUsers, "id" | "createdAt">): Promise<GETUsers> => {
  const res = await axios.post(API_URL, {
    ...user,
    createdAt: new Date().toISOString(),
  });
  return res.data;
};

export const updateUser = async (id: number, user: Omit<GETUsers, "id">): Promise<GETUsers> => {
  const res = await axios.put(`${API_URL}/${id}`, user);
  return res.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
