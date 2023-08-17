import { instanceToPlain } from 'class-transformer';
import { AppDataStore } from '../../index';
import { Tasks } from './task.entity';

export class TaskController {
  constructor(private taskRepository = AppDataStore.getRepository(Tasks)) {}
  public async getAll(): Promise<Tasks[]> {
    try {
      let allTasks: Tasks[] = await this.taskRepository.find({
        order: {
          date: 'ASC',
        },
      });
      allTasks = instanceToPlain(allTasks) as Tasks[];
      return allTasks;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
