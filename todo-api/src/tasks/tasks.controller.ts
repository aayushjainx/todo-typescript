import { AppDataStore } from '../../index';
import { Tasks } from './task.entity';

export class TaskController {
  constructor(private taskRepository = AppDataStore.getRepository(Tasks)) {}
  public async getAll(): Promise<Tasks[]> {}
}
