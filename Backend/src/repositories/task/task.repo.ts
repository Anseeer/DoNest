import { Types } from "mongoose";
import { ITask } from "../../models/task/task.interface";
import Task from "../../models/task/task.model";
import logger from "../../utilities/logger";
import { BaseRepository } from "../base/base.repo";
import { ITaskRepository } from "./task.repo.interface";

export class TaskRepository extends BaseRepository<ITask> implements ITaskRepository {

    constructor() {
        super(Task)
    }

    async listTaskByUser(userId: string): Promise<ITask[]> {
        try {
            if (!userId) {
                throw new Error("UserID missing.")
            }
            return await this.model.find({ userId: new Types.ObjectId(userId) });
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error('Error :', errMsg);
            throw new Error(errMsg)
        }
    }

    async toggleIsCompleted(taskId: string, userId: string): Promise<ITask | null> {
        try {
            const task = await this.model.findOne({ _id: taskId, userId: new Types.ObjectId(userId) });

            if (!task) return null;

            return await this.model.findByIdAndUpdate(
                taskId,
                { $set: { completed: !task.completed } },
                { new: true }
            );
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error('Error :', errMsg);
            throw new Error(errMsg)
        }
    }

}