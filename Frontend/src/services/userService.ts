import type { IUser } from "../types/IUser";
import { api } from "./axios";

export const register = async (userData: Partial<IUser>) => {
    if (!userData) {
        throw new Error("User Data Missing");
    }
    const response = await api.post('/register', userData, { withCredentials: true });
    return response.data.data;
}

export const login = async (userData: Partial<IUser>) => {
    if (!userData) {
        throw new Error("User Data Missing");
    }
    const response = await api.post('/login', userData, { withCredentials: true });
    return response.data.data;
}

export const logout = async () => {
    const response = await api.post('/logout');
    return response.data;
}