import { NextFunction, Request, Response } from "express";
import { IUserService } from "../../services/user/user.service.interface";
import { IUserController } from "./user.controller.interface";
import logger from "../../utilities/logger";
import { errorResponse, successResponse } from "../../utilities/response";
import { StatusCode } from "../../utilities/statusCode";
import { AuthRequest } from "../../midllewares/authMiddleware";

export class UserController implements IUserController {
    private _userService: IUserService;

    constructor(userService: IUserService) {
        this._userService = userService;
    }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                throw new Error('Required user data is missing or undefined.')
            }

            const userData = { name, email, password };
            const { user, accessToken, refreshToken } = await this._userService.register(userData);

            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
                maxAge: 10 * 60 * 1000,
            });

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            const response = new successResponse(StatusCode.OK, 'Registration successful.', { user });
            res.status(response.status).json(response);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error("Controller.userController -> Registration faild.", errMsg)
            next(new errorResponse(StatusCode.INTERNAL_SERVER_ERROR, errMsg, {}))
        }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw new Error("Missing required credentials: email or password.");
            }

            const userData = { email, password };
            const { user, accessToken, refreshToken } = await this._userService.login(userData);

            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
                maxAge: 10 * 60 * 1000,
            });

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            const response = new successResponse(StatusCode.OK, 'Login successful.', { user });
            res.status(response.status).json(response);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error("Controller.userController -> Login faild.", errMsg)
            next(new errorResponse(StatusCode.INTERNAL_SERVER_ERROR, errMsg, {}))
        }
    }

    logout = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {

            res.clearCookie("accessToken", {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
            });

            res.clearCookie("refreshToken", {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
            });

            const response = new successResponse(StatusCode.OK, 'Logout successful.', {});
            res.status(response.status).json(response);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error("Controller.userController -> Logout faild.", errMsg)
            next(new errorResponse(StatusCode.INTERNAL_SERVER_ERROR, errMsg, {}))
        }
    }

    fetchUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.userId;
            const user = await this._userService.findById(userId as string);
            const response = new successResponse(StatusCode.OK, 'Fetch user successful.', { user });
            res.status(response.status).json(response);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error("Controller.userController -> Logout faild.", errMsg)
            next(new errorResponse(StatusCode.INTERNAL_SERVER_ERROR, errMsg, {}))
        }
    }

}