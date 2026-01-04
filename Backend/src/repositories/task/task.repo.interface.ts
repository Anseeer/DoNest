import { ITask } from "../../models/task/task.interface";
import { IRead, IWrite } from "../base/base.repo.interface";

export interface ITaskRepository extends IWrite<ITask>, IRead<ITask> {
    listTaskByUser(userId: string): Promise<ITask[]>;
    toggleIsCompleted(taskId: string, userId: string): Promise<ITask | null>;
}