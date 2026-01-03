import jwt from "jsonwebtoken";

export const generateAccessToken = (user: { userId: string; email: string }) => {
    const secret = process.env.JWT_ACCESSTOKEN_SECRET;

    if (!secret) {
        throw new Error("JWT_ACCESSTOKEN_SECRET is not defined");
    }

    return jwt.sign(user, secret, {
        expiresIn: "10m", 
    });
};

export const generateRefreshToken = (user: { userId: string; email: string }) => {
    const secret = process.env.JWT_REFRESHTOKEN_SECRET;

    if (!secret) {
        throw new Error("JWT_REFRESHTOKEN_SECRET is not defined");
    }

    return jwt.sign(user, secret, {
        expiresIn: "7d", 
    });
};
