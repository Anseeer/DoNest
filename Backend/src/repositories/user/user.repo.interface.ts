import { IUser } from "../../models/user/user.model.interface";
import { IRead, IWrite } from "../base/base.repo.interface";

export interface IUserRepository extends IWrite<IUser>, IRead<IUser> {

}