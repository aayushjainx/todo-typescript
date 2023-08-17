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
    } catch (err) {
      console.error(err);
    }
  }
}
