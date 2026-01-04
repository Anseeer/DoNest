import { ITask } from "../../models/task/task.interface";

export interface ITaskService {
    addTask(taskData: Partial<ITask>): Promise<ITask>
    deleteTask(taskId: string): Promise<boolean>
    toggleIsCompleted(taskId: string, userId: string): Promise<ITask | null>
    updatedTask(taskId: string, taskData: Partial<ITask>): Promise<ITask>
    listTasksByUser(userId: string): Promise<ITask[]>
}