import { Request, Response, Router } from 'express';
import { TaskController } from './tasks.controller';

export const taskRouter: Router = Router();

taskRouter.get('/tasks', (req: Request, res: Response) => {
  const taskController = new TaskController();
  taskController.getAll();
});
