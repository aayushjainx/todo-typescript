import { Request, Response, Router } from 'express';
import { TaskController } from './tasks.controller';
import { createValidator } from './tasks.validator';
import { validationResult } from 'express-validator';

export const taskRouter: Router = Router();

taskRouter.get('/tasks', async (req: Request, res: Response) => {
  const taskController = new TaskController();
  const allTasks = await taskController.getAll();
  res.json(allTasks).status(200);
});

taskRouter.post(
  '/tasks',
  createValidator,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return res.status(200).json({ message: 'Task created successfully' });
  },
);
