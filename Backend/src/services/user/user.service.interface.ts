import { IUser } from "../../models/user/user.model.interface";
import { IUserDTO } from "../../utilities/userDTO";

export interface IUserService {
    register(userData: Partial<IUser>): Promise<{ user: IUserDTO, accessToken: string, refreshToken: string }>
    login(userData: Partial<IUser>): Promise<{ user: IUserDTO, accessToken: string, refreshToken: string }>
    findById(userId: string): Promise<IUserDTO | null>
    findByEmail(email: string): Promise<IUserDTO | null>
}