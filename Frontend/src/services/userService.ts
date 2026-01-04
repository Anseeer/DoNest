import type { ITask } from "../types/ITask";
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

export const fetchUser = async () => {
    const response = await api.post('/fetch-user');
    return response.data;
}

export const addTask = async (title: string, description: string, userId: string) => {
    const taskData = { title, description, userId };
    const response = await api.post('/task/add', { taskData });
    return response.data.data;
}

export const updateTaskApi = async (taskData: ITask) => {
    const response = await api.post('/task/update', { taskData });
    return response.data.data;
}

export const deleteTaskApi = async (taskId: string) => {
    const response = await api.delete(`/task/delete?taskId=${taskId}`);
    return response.data.data;
}

export const toggleTaskApi = async (taskId: string, userId: string) => {
    const response = await api.patch(`/task/toggle?taskId=${taskId}&userId=${userId}`);
    return response.data.data;
}