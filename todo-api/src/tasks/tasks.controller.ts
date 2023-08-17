import { instanceToPlain, plainToInstance } from 'class-transformer';
import { AppDataStore } from '../../index';
import { Tasks } from './tasks.entity';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UpdateResult } from 'typeorm';

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

    const newTask: Tasks = new Tasks();

    newTask.title = req.body.title;
    newTask.date = req.body.date;
    newTask.description = req.body.description;
    newTask.priority = req.body.priority;
    newTask.status = req.body.status;

    try {
      let createTask = await AppDataStore.getRepository(Tasks).save(newTask);
      createTask = instanceToPlain(createTask) as Tasks;
      return res.json(createTask).status(201);
    } catch (_err) {
      return res.json({ message: 'Something went wrong' }).status(500);
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const task: Tasks | null = await AppDataStore.getRepository(
        Tasks,
      ).findOne({ where: { id: req.body.id } });
      if (!task) return res.json({ message: 'Task not found' }).status(404);
      let updateTask: UpdateResult = await AppDataStore.getRepository(
        Tasks,
      ).update(
        req.body.id,
        plainToInstance(Tasks, { status: req.body.status }),
      );
      updateTask = instanceToPlain(updateTask) as UpdateResult;
      return res.json(updateTask).status(200);
    } catch (_err) {
      return res.json({ message: 'Something went wrong' }).status(500);
    }
  }
}

export const taskController = new TaskController();
