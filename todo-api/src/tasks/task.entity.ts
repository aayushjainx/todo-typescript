import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Priority } from '../enums/priority';
import { Status } from '../enums/Status';

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  date: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: Priority, default: Priority.medium })
  priority: Priority;

  @Column({ type: 'enum', enum: Status, default: Status.todo })
  status: Status;
}
