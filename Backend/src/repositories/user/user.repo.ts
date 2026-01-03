import User from "../../models/user/user.model";
import { IUser } from "../../models/user/user.model.interface";
import { BaseRepository } from "../base/base.repo";
import { IUserRepository } from "./user.repo.interface";

export class UserRepository extends BaseRepository<IUser> implements IUserRepository {

    constructor() {
        super(User)
    }

}