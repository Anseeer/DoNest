import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { generateAccessToken } from "../utilities/generateToken";
import { errorResponse } from "../utilities/response";
import { StatusCode } from "../utilities/statusCode";

export interface AuthRequest extends Request {
    user?: JwtPayload & { userId: string, email: string }
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;
    if (!accessToken && !refreshToken) {
        return next(new errorResponse(StatusCode.UNAUTHORIZED, "Access denied", "No access or refresh token provided"))
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_ACCESSTOKEN_SECRET as string) as JwtPayload & { userId: string, email: string };
        req.user = decoded;
        next()
    } catch {
        try {
            if (!refreshToken) {
                return next(new errorResponse(StatusCode.UNAUTHORIZED, "Access denied", "No refresh token provided"))
            }
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESHTOKEN_SECRET as string) as JwtPayload & { userId: string, email: string };
            const newToken = generateAccessToken({ userId: decoded.userId, email: decoded.email });
            res.cookie('accessToken', newToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
                maxAge: 10 * 60 * 1000,
            })
            req.user = decoded;
            next();
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            return next(new errorResponse(StatusCode.UNAUTHORIZED, "Access denied", errMsg))
        }
    }

}