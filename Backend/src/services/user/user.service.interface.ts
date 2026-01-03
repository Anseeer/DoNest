import { IUser } from "../../models/user/user.model.interface";

export interface IUserService {
    register(userData: Partial<IUser>): Promise<{ user: IUser, accessToken: string, refreshToken: string }>
    login(userData: Partial<IUser>): Promise<{ user: IUser, accessToken: string, refreshToken: string }>
    findById(userId: string): Promise<IUser | null>
    findByEmail(email: string): Promise<IUser | null>
}