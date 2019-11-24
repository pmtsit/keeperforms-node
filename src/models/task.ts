import { Project } from './project';
import { Type } from 'class-transformer';
import { User } from './user';
import { Timing } from './timing';
import { TaskLink } from './task-link';

export class Task {
  public id: string;
  @Type(() => Project)
  public project: Project;
  @Type(() => Task)
  public parent?: Task;
  @Type(() => Task)
  public children?: Task[];
  public name: string;
  public description?: string;
  @Type(() => Timing)
  public planned: Timing;
  @Type(() => Timing)
  public actual: Timing;
  @Type(() => User)
  public assignee?: User;
  public estimation?: number;
  @Type(() => TaskLink)
  public predecessors?: TaskLink[];
  @Type(() => TaskLink)
  public successors?: TaskLink[];
}
