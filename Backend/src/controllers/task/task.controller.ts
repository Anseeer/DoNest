import { Response, NextFunction } from "express";
import { ITaskController } from "./task.controller.interface";
import logger from "../../utilities/logger";
import { errorResponse, successResponse } from "../../utilities/response";
import { StatusCode } from "../../utilities/statusCode";
import { ITaskService } from "../../services/task/task.service.interface";
import { AuthRequest } from "../../midllewares/authMiddleware";

export class TaskController implements ITaskController {
    private _taskService: ITaskService;
    constructor(taskServ: ITaskService) {
        this._taskService = taskServ;
    }

    addTask = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { title, description, userId } = req.body.taskData;
            if (!title || !userId) {
                throw new Error("Missing data is required");
            }

            const taskData = { title, description: description || "", userId };
            const task = await this._taskService.addTask(taskData);
            const response = new successResponse(StatusCode.OK, "Added successfully", { task });
            const targetRoom = task.userId.toString();

            req.app.get("io")
                .to(targetRoom)
                .emit('task:added', task);

            res.status(response.status).json(response);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error(errMsg);
            next(new errorResponse(StatusCode.INTERNAL_SERVER_ERROR, errMsg, {}));
        }
    }

    deleteTask = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { taskId } = req.query;
            if (!taskId) {
                throw new Error("TaskiId data is required");
            }

            await this._taskService.deleteTask(taskId as string);
            const response = new successResponse(StatusCode.OK, "Deleted successfully", {});
            const targetRoom = req.user?.userId.toString();

            req.app.get("io")
                .to(targetRoom)
                .emit('task:deleted', taskId);

            res.status(response.status).json(response);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error(errMsg);
            next(new errorResponse(StatusCode.INTERNAL_SERVER_ERROR, errMsg, {}));
        }
    }

    updateTask = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { taskData } = req.body;
            if (!taskData.title ) {
                throw new Error("Missing required data");
            }

            const task = await this._taskService.updatedTask(taskData._id, taskData);
            const response = new successResponse(StatusCode.OK, "Updated successfully", { task });
            const targetRoom = task.userId.toString();

            req.app.get("io")
                .to(targetRoom)
                .emit('task:updated', task);

            res.status(response.status).json(response);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error(errMsg);
            next(new errorResponse(StatusCode.INTERNAL_SERVER_ERROR, errMsg, {}));
        }
    }

    toggleIsCompleted = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { userId, taskId } = req.query;
            if (!userId || !taskId) {
                throw new Error("Missing required data");
            }

            const task = await this._taskService.toggleIsCompleted(taskId as string, userId as string);
            const response = new successResponse(StatusCode.OK, "Updated successfully", { task });
            const targetRoom = task?.userId.toString();

            req.app.get("io")
                .to(targetRoom)
                .emit('task:toggled', task);

            res.status(response.status).json(response);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error(errMsg);
            next(new errorResponse(StatusCode.INTERNAL_SERVER_ERROR, errMsg, {}));
        }
    }

    listTaskByUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user?.userId;
            const listTasks = await this._taskService.listTasksByUser(userId as string);
            const response = new successResponse(StatusCode.OK, "List tasks successfully", { listTasks });
            res.status(response.status).json(response);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error(errMsg);
            next(new errorResponse(StatusCode.INTERNAL_SERVER_ERROR, errMsg, {}));
        }
    }
}