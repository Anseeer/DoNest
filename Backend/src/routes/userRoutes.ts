import express from "express"
import { UserRepository } from "../repositories/user/user.repo";
import { UserService } from "../services/user/user.service";
import { UserController } from "../controllers/user/user.controller";
import { auth } from "../midllewares/authMiddleware";

const route = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

route.post('/register', userController.register)
route.post('/login', userController.login)
route.post('/logout', auth, userController.logout)
route.post('/fetch-user', userController.fetchUser)

export default route;