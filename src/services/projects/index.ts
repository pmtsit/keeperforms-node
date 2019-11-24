import { AxiosInstance } from 'axios';
import { Project } from '../../models/project';
import BaseService from '../base';
import { classToPlain, Expose, plainToClass } from 'class-transformer';

export interface ICreateProjectParams {
  workspace: string;
  name: string;
  imageUrl?: string;
  description?: string;
}

export class CreateProjectParams implements ICreateProjectParams {
  public workspace: string;
  public name: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  public description?: string;

  constructor(createProjectParams: ICreateProjectParams) {
    Object.assign(this, createProjectParams);
  }
}

export interface IPatchProjectParams {
  name?: string;
  slug?: string;
  description?: string;
  active?: boolean;
  imageUrl?: string;
  place?: {
    name?: string;
    workspace?: string;
    location?: string;
    googlePlaceId?: string;
  };
}

export class Place {
  public name?: string;
  public workspace?: string;
  public location?: string;
  @Expose({ name: 'google_place_id' })
  public googlePlaceId?: string;
}

export class PatchProjectParams implements IPatchProjectParams {
  public name?: string;
  public slug?: string;
  public description?: string;
  public active?: boolean;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  public place?: Place;

  constructor(patchProjectParams: IPatchProjectParams) {
    Object.assign(this, patchProjectParams);
  }
}

export default class ProjectsService extends BaseService<Project> {
  constructor(axios: AxiosInstance) {
    super(axios, '/projects');
  }

  public async list(offset?: number, limit?: number): Promise<Project[]> {
    const result = await super._list(offset, limit);

    const projects = result ? plainToClass(Project, result) : [];

    return projects;
  }

  public async get(id: string): Promise<Project | null> {
    const result = await super._get(id);

    const project = result ? plainToClass(Project, result) : null;

    return project;
  }

  public async create(params: ICreateProjectParams): Promise<Project | null> {
    const result = await super._create(classToPlain(new CreateProjectParams(params)));

    const project = result ? plainToClass(Project, result) : null;

    return project;
  }

  public async patch(id: string, params: IPatchProjectParams): Promise<Project | null> {
    const result = await super._patch(id, classToPlain(new PatchProjectParams(params)));

    const project = result ? plainToClass(Project, result) : null;

    return project;
  }
}
