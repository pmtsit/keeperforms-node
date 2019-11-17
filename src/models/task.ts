import { Project } from './project';
import { Expose, Type } from 'class-transformer';
import { User } from './user';

export class Task {
  public id!: string;
  @Type(() => Project)
  public project!: Project;
  @Type(() => Task)
  public parent?: Task;
  @Type(() => Task)
  public children?: Task[];
  public name!: string;
  public description?: string;
  @Type(() => Timing)
  public planned!: Timing;
  @Type(() => Timing)
  public actual!: Timing;
  @Type(() => User)
  public assignee?: User;
  public estimation?: number;
  @Type(() => TaskLink)
  public predecessors?: TaskLink[];
  @Type(() => TaskLink)
  public successors?: TaskLink[];
}

export class Timing {
  @Type(() => Date)
  public start?: Date;
  @Type(() => Date)
  public end?: Date;
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

