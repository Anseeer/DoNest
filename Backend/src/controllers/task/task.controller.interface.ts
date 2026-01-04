import { NextFunction, Request, Response } from "express";

export interface ITaskController {
    addTask(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteTask(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateTask(req: Request, res: Response, next: NextFunction): Promise<void>;
    listTaskByUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    toggleIsCompleted(req: Request, res: Response, next: NextFunction): Promise<void>;
}