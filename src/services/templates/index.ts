import { AxiosInstance } from 'axios';
import { Template, TemplateBlock } from '../../models/template';
import BaseService from '../base';
import { classToPlain, Expose, plainToClass } from 'class-transformer';
import { IDeleteResult } from '../../models/delete-result';

export interface ICreateTemplateParams {
  workspace: string;
  name: string;
  imageUrl?: string;
  description?: string;
}

export class CreateTemplateParams implements ICreateTemplateParams {
  public workspace!: string;
  public name!: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  public description?: string;

  constructor(createTemplateParams: ICreateTemplateParams) {
    Object.assign(this, createTemplateParams);
  }
}

export interface IPatchTemplateParams {
  name?: string;
  description?: string;
  imageUrl?: string;
}

export class PatchTemplateParams implements IPatchTemplateParams {
  public name?: string;
  public description?: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;

  constructor(patchTemplateParams: IPatchTemplateParams) {
    Object.assign(this, patchTemplateParams);
  }
}

export interface ICreateTemplateBlockParams {
  block: string;
  title: string;
  subTitle?: string;
  viewOrder?: number;
}

export class CreateTemplateBlockParams implements ICreateTemplateBlockParams {
  public block!: string;
  public title!: string;
  @Expose({ name: 'sub_title' })
  public subTitle?: string;
  @Expose({ name: 'view_order' })
  public viewOrder?: number;

  constructor(createTemplateBlockParams: ICreateTemplateBlockParams) {
    Object.assign(this, createTemplateBlockParams);
  }
}

export interface IPatchTemplateBlockParams {
  title?: string;
  subTitle?: string;
  viewOrder?: number;
}

export class PatchTemplateBlockParams implements IPatchTemplateBlockParams {
  public title?: string;
  @Expose({ name: 'sub_title' })
  public subTitle?: string;
  @Expose({ name: 'view_order' })
  public viewOrder?: number;

  constructor(patchTemplateBlockParams: IPatchTemplateBlockParams) {
    Object.assign(this, patchTemplateBlockParams);
  }
}

export default class TemplatesService extends BaseService<Template> {
  constructor(axios: AxiosInstance) {
    super(axios, '/templates');
  }

  public async list(offset?: number, limit?: number): Promise<Template[]> {
    const result = await super._list(offset, limit);

    const templates = result ? plainToClass(Template, result) : [];

    return templates;
  }

  public async get(id: string): Promise<Template | null> {
    const result = await super._get(id);

    const template = result ? plainToClass(Template, result) : null;

    return template;
  }

  public async create(params: ICreateTemplateParams): Promise<Template | null> {
    const result = await super._create(classToPlain(new CreateTemplateParams(params)));

    const template = result ? plainToClass(Template, result) : null;

    return template;
  }

  public async patch(id: string, params: IPatchTemplateParams): Promise<Template | null> {
    const result = await super._patch(id, classToPlain(new PatchTemplateParams(params)));

    const template = result ? plainToClass(Template, result) : null;

    return template;
  }

  public async blocksList(template: string, offset?: number, limit?: number): Promise<TemplateBlock[]> {
    if (!this.axios) {
      return [];
    }

    const params: any = {
      limit,
      offset,
    };

    const result = await this.axios.get(`${this.endpoint}/${template}/blocks/`, params);

    const data = result.data;

    const templateBlocks = data ? plainToClass(TemplateBlock, data) : [];

    return templateBlocks as TemplateBlock[];
  }

  public async blocksGet(template: string, id: string): Promise<TemplateBlock | null> {
    if (!this.axios) {
      return null;
    }

    const result = await this.axios.get(`${this.endpoint}/${template}/blocks/${id}`, {});

    const data = result.data;

    const templateBlock = data ? plainToClass(TemplateBlock, data) : null;

    return templateBlock;
  }

  public async blocksCreate(template: string, params: ICreateTemplateBlockParams): Promise<TemplateBlock | null> {
    if (!this.axios) {
      return null;
    }

    const result = await this.axios.post(`${this.endpoint}/${template}/blocks/`, params);

    const data = result.data;

    const templateBlock = data ? plainToClass(TemplateBlock, data) : null;

    return templateBlock;
  }

  public async blocksPatch(
    template: string,
    id: string,
    params: IPatchTemplateBlockParams,
  ): Promise<TemplateBlock | null> {
    if (!this.axios) {
      return null;
    }

    const result = await this.axios.patch(`${this.endpoint}/${template}/blocks/${id}`, params);

    const data = result.data;

    const templateBlock = data ? plainToClass(TemplateBlock, data) : null;

    return templateBlock;
  }

  public async blocksDelete(template: string, id: string): Promise<IDeleteResult> {
    if (!this.axios) {
      return {
        id,
        message: 'axios not initialized',
        result: false,
      };
    }

    const result = await this.axios.delete(`${this.endpoint}/${template}/blocks/${id}`);

    const data = result.data as IDeleteResult;

    return data;
  }
}
