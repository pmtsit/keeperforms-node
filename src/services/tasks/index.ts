import { AxiosInstance } from 'axios';
import { Task } from '../../models/task';
import BaseService from '../base';
import { classToPlain, Expose, plainToClass } from 'class-transformer';
import { Timing } from '../../models/task';

export interface ICreateTaskParams {
  project: string;
  name: string;
  description?: string;
}

export class CreateTaskParams implements ICreateTaskParams {
  public project!: string;
  public name!: string;
  public description?: string;

  constructor(createTaskParams: ICreateTaskParams) {
    Object.assign(this, createTaskParams);
  }
}

export interface IPatchTaskParams {
  name?: string;
  description?: string;
  planned?: Timing;
  actual?: Timing;
  estimation?: number;
}

export class PatchTaskParams implements IPatchTaskParams {
  public name?: string;
  public description?: string;
  public planned?: Timing;
  public actual?: Timing;
  public estimation?: number;

  constructor(patchTaskParams: IPatchTaskParams) {
    Object.assign(this, patchTaskParams);
  }
}

export default class TasksService extends BaseService<Task> {
  constructor(axios: AxiosInstance) {
    super(axios, '/tasks');
  }

  public async list(offset?: number, limit?: number): Promise<Task[]> {
    const result = await super._list(offset, limit);

    const tasks = result ? plainToClass(Task, result) : [];

    return tasks;
  }

  public async get(id: string): Promise<Task | null> {
    const result = await super._get(id);

    const task = result ? plainToClass(Task, result) : null;

    return task;
  }

  public async create(params: ICreateTaskParams): Promise<Task | null> {
    const result = await super._create(classToPlain(new CreateTaskParams(params)));

    const task = result ? plainToClass(Task, result) : null;

    return task;
  }

  public async patch(id: string, params: IPatchTaskParams): Promise<Task | null> {
    const result = await super._patch(id, classToPlain(new PatchTaskParams(params)));

    const task = result ? plainToClass(Task, result) : null;

    return task;
  }
}
