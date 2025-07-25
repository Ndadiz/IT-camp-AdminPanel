import axios from "axios";
import type { User, AuthData } from "@entities/model/users";
import httpClient from "./httpClient";

export const fetchUsers = async (): Promise<User[]> => {
  const response = await httpClient.get<User[]>("/users");
  return response.data;
};

export const fetchOne = (id:string) => axios.get(`/api/v1/users/${id}`).then(res => res.data)

export const createUser = async (user: User): Promise<User> => {
  return await axios.post(`/api/v1/users`, user);
};

export const updateUser = async (id:string, user: Partial<User>): Promise<User> => {
  const response = await axios.patch(`/api/v1/users/${id}`, user);
  return response.data;
};


export const deleteUser = async (id: string): Promise<void> => {
  await axios.delete(`/api/v1/users/${id}`);
};

export const login = async (data: AuthData ): Promise<AuthData> => {
  return await axios.post(`/api/v1/auth/login`, data);
}

export const logout = async (): Promise<AuthData> => {
  return await axios.post(`/api/v1/auth/logout`);
}

export const fetchMe = () => axios.get(`/api/v1/auth/me`).then(res => res.data);