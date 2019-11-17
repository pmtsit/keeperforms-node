import { AxiosInstance } from 'axios';
import { Workspace } from '../../models/workspace';
import BaseService from '../base';
import { classToPlain, Expose, plainToClass } from 'class-transformer';
import { Place } from '../projects';

export interface ICreateWorkspaceParams {
  name: string;
}

export class CreateWorkspaceParams implements ICreateWorkspaceParams {
  public name!: string;

  constructor(createWorkspaceParams: ICreateWorkspaceParams) {
    Object.assign(this, createWorkspaceParams);
  }
}

export interface IPatchWorkspaceParams {
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

export class PatchWorkspaceParams implements IPatchWorkspaceParams {
  name?: string;
  slug?: string;
  description?: string;
  active?: boolean;
  @Expose({ name: 'image_url' })
  imageUrl?: string;
  place?: Place;

  constructor(patchWorkspaceParams: IPatchWorkspaceParams) {
    Object.assign(this, patchWorkspaceParams);
  }
}

export default class WorkspacesService extends BaseService<Workspace> {
  constructor(axios: AxiosInstance) {
    super(axios, '/workspaces');
  }

  public async list(offset?: number, limit?: number): Promise<Workspace[]> {
    const result = await super._list(offset, limit);

    console.log(result);
    const workspaces = result ? plainToClass(Workspace, result) : [];
    console.log(workspaces);

    return workspaces;
  }

  public async get(id: string): Promise<Workspace | null> {
    const result = await super._get(id);

    const workspace = result ? plainToClass(Workspace, result) : null;

    return workspace;
  }

  public async create(params: ICreateWorkspaceParams): Promise<Workspace | null> {
    const result = await super._create(classToPlain(new CreateWorkspaceParams(params)));

    const workspace = result ? plainToClass(Workspace, result) : null;

    return workspace;
  }

  public async patch(id: string, params: IPatchWorkspaceParams): Promise<Workspace | null> {
    const result = await super._patch(id, classToPlain(new PatchWorkspaceParams(params)));

    const workspace = result ? plainToClass(Workspace, result) : null;

    return workspace;
  }
}
