import { Expose } from 'class-transformer';
import { Task } from './task';

export class TaskLink {
  public id: string;
  public first: Task;
  public second: Task;
  @Expose({ name: 'start_after_start' })
  public startAfterStart: boolean;
  @Expose({ name: 'start_after_finish' })
  public startAfterFinish: boolean;
  @Expose({ name: 'finish_after_start' })
  public finishAfterStart: boolean;
  @Expose({ name: 'finish_after_finish' })
  public finishAfterFinish: boolean;
}
