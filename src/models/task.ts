import { Project } from './project';
import { Expose } from 'class-transformer';

export class Task {
  public id!: string;
  public project!: Project;
  public parent?: Task;
  public children?: Task[];
  public name!: string;
  public description?: string;
  public planned!: Timing;
  public actual!: Timing;
  public assignee?: User;
  public estimation?: number;
  public predecessors?: TaskLink[];
  public successors?: TaskLink[];
}

export interface Timing {
  start?: Date;
  end?: Date;
}

export class TaskLink {
  public id!: string;
  public first!: Task;
  public second!: Task;
  @Expose({ name: 'start_after_start' })
  public startAfterStart!: boolean;
  @Expose({ name: 'start_after_finish' })
  public startAfterFinish!: boolean;
  @Expose({ name: 'finish_after_start' })
  public finishAfterStart!: boolean;
  @Expose({ name: 'finish_after_finish' })
  public finishAfterFinish!: boolean;
}

export type User = any;
