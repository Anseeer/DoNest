import { ITask } from "../../models/task/task.interface";
import { ITaskRepository } from "../../repositories/task/task.repo.interface";
import logger from "../../utilities/logger";
import { ITaskService } from "./task.service.interface";

export class TaskService implements ITaskService {
    private _taskRepository: ITaskRepository;
    constructor(taskRepo: ITaskRepository) {
        this._taskRepository = taskRepo;
    }

    async addTask(taskData: Partial<ITask>): Promise<ITask> {
        try {
            if (!taskData) {
                throw new Error("TaskData missing.")
            }
            return await this._taskRepository.create(taskData);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error(errMsg);
            throw new Error(errMsg);
        }
    }

    async updatedTask(taskId: string, taskData: Partial<ITask>): Promise<ITask> {
        try {
            if (!taskData || !taskId) {
                throw new Error("TaskData or taskId missing.")
            }
            return await this._taskRepository.update(taskId, taskData);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error(errMsg);
            throw new Error(errMsg);
        }
    }

    async deleteTask(taskId: string): Promise<boolean> {
        try {
            if (!taskId) {
                throw new Error("taskId missing.")
            }
            return await this._taskRepository.delete(taskId);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error(errMsg);
            throw new Error(errMsg);
        }
    }

    async toggleIsCompleted(taskId: string, userId: string): Promise<ITask | null> {
        try {
            if (!taskId || !userId) {
                throw new Error("taskId or userId missing.")
            }
            return await this._taskRepository.toggleIsCompleted(taskId, userId);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error(errMsg);
            throw new Error(errMsg);
        }
    }

    async listTasksByUser(userId: string): Promise<ITask[]> {
        try {
            if (!userId) {
                throw new Error("UserId missing.")
            }
            return await this._taskRepository.listTaskByUser(userId);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error(errMsg);
            throw new Error(errMsg);
        }
    }

}