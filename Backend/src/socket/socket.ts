import { Server, Socket } from "socket.io";
import { TaskRepository } from "../repositories/task/task.repo";
import { TaskService } from "../services/task/task.service";

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository)

export const socketHandler = async (io: Server, socket: Socket, userId: string) => {
    const tasks = await taskService.listTasksByUser(userId)
    io.to(userId).emit('task:list', tasks);
}