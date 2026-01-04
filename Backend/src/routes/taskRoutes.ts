import express from 'express';
import { TaskRepository } from '../repositories/task/task.repo';
import { TaskController } from '../controllers/task/task.controller';
import { TaskService } from '../services/task/task.service';
import { auth } from '../midllewares/authMiddleware';

const route = express.Router();
const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const userController = new TaskController(taskService);

route.post('/list', auth, userController.listTaskByUser)
route.post('/add', auth, userController.addTask)
route.post('/update', auth, userController.updateTask)
route.delete('/delete', auth, userController.deleteTask)
route.patch('/toggle', auth, userController.toggleIsCompleted)

export default route;