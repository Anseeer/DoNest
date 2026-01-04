import { NextFunction, Request, Response } from "express";

export interface IUserController {
    register(req: Request, res: Response, next: NextFunction): Promise<void>;
    login(req: Request, res: Response, next: NextFunction): Promise<void>;
    logout(req: Request, res: Response, next: NextFunction): Promise<void>;
    fetchUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}