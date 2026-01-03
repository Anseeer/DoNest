import { IUser } from "../../models/user/user.model.interface";
import { IUserRepository } from "../../repositories/user/user.repo.interface";
import { generateAccessToken, generateRefreshToken } from "../../utilities/generateToken";
import logger from "../../utilities/logger";
import { IUserService } from "./user.service.interface";
import bcrypt from 'bcrypt'

export class UserService implements IUserService {
    private _userRepository: IUserRepository;
    constructor(userRepo: IUserRepository) {
        this._userRepository = userRepo;
    }

    async register(userData: Partial<IUser>): Promise<{ user: IUser, accessToken: string, refreshToken: string }> {
        try {
            if (!userData) {
                throw new Error("User data is missing.");
            }

            const userExist = await this._userRepository.findByEmail(userData?.email as string);
            if (userExist) {
                throw new Error('An account with this email already exists.');
            }

            const saltround = 10;
            const hashPass = await bcrypt.hash(userData?.password as string, saltround)
            userData.password = hashPass;

            const user = await this._userRepository.create(userData);
            const accessToken = await generateAccessToken({ userId: user?.id, email: user?.email });
            const refreshToken = await generateRefreshToken({ userId: user?.id, email: user?.email });

            return { user, accessToken, refreshToken };
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error("Error:", errMsg);
            throw new Error(errMsg)
        }
    }

    async login(userData: Partial<IUser>): Promise<{ user: IUser, accessToken: string, refreshToken: string }> {
        try {
            if (!userData) {
                throw new Error("User data is missing.");
            }

            const userExist = await this._userRepository.findByEmail(userData?.email as string);

            if (!userExist) {
                throw new Error("Account not found. Please register.")
            }

            const passmatch = await bcrypt.compare(userData?.password as string, userExist?.password);
            if (!passmatch) {
                throw new Error('The password you entered is incorrect.')
            }

            const user = userExist;
            const accessToken = await generateAccessToken({ userId: user?.id, email: user?.email });
            const refreshToken = await generateRefreshToken({ userId: user?.id, email: user?.email });

            return { user, accessToken, refreshToken };
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error("Error:", errMsg);
            throw new Error(errMsg)
        }
    }

    async findById(userId: string): Promise<IUser | null> {
        try {
            if (!userId) {
                throw new Error("userId not found");
            }
            return await this._userRepository.findById(userId)
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error('Error :', errMsg);
            throw new Error(errMsg)
        }
    }

    async findByEmail(email: string): Promise<IUser | null> {
        try {
            if (!email) {
                throw new Error("email not get");
            }
            return await this._userRepository.findByEmail(email)
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error('Error :', errMsg);
            throw new Error(errMsg)
        }
    }

}