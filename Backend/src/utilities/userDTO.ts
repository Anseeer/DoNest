import { IUser } from "../models/user/user.model.interface"

export interface IUserDTO {
    _id: string
    name: string,
    email: string,
    createdAt: Date,
    updatedAt: Date
}

export const mapUserToDTO = (userData: Partial<IUser>): IUserDTO => {
    return {
        _id: userData._id?.toString() as string,
        name: userData.name as string,
        email: userData.email as string,
        createdAt: userData.createdAt as Date,
        updatedAt: userData.updatedAt as Date
    }
}