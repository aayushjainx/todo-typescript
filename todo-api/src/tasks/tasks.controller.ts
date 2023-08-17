import { instanceToPlain } from 'class-transformer';
import { AppDataStore } from '../../index';
import { Tasks } from './tasks.entity';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

class TaskController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      let allTasks: Tasks[] = await AppDataStore.getRepository(Tasks).find({
        order: {
          date: 'ASC',
        },
      });
      allTasks = instanceToPlain(allTasks) as Tasks[];
      return res.json(allTasks).status(200);
    } catch (_err) {
      return res.json({ message: 'Something went wrong' }).status(500);
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return res.status(200).json({ message: 'Task created successfully' });
  }
}

export const taskController = new TaskController();
