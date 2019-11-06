import { AxiosInstance } from 'axios';
import { Item } from '../../models/item';
import BaseService from '../base';
import { classToPlain, Expose, plainToClass } from 'class-transformer';

export interface ICreateItemParams {
  workspace: string;
  name: string;
  itemCategory: string;
  imageUrl?: string;
  description?: string;
}

export class CreateItemParams implements ICreateItemParams {
  public workspace!: string;
  public name!: string;
  @Expose({ name: 'item_category' })
  public itemCategory!: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  public description?: string;

  constructor(createItemParams: ICreateItemParams) {
    Object.assign(this, createItemParams);
  }
}

export interface IPatchItemParams {
  name?: string;
  description?: string;
  itemCategory?: string;
  imageUrl?: string;
}

export class PatchItemParams implements IPatchItemParams {
  public name?: string;
  public description?: string;
  @Expose({ name: 'item_category' })
  public itemCategory?: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;

  constructor(patchItemParams: IPatchItemParams) {
    Object.assign(this, patchItemParams);
  }
}

export default class ItemsService extends BaseService<Item> {
  constructor(axios: AxiosInstance) {
    super(axios, '/items');
  }

  public async list(offset?: number, limit?: number): Promise<Item[]> {
    const result = await super._list(offset, limit);

    const items = result ? plainToClass(Item, result) : [];

    return items;
  }

  public async get(id: string): Promise<Item | null> {
    const result = await super._get(id);

    const item = result ? plainToClass(Item, result) : null;

    return item;
  }

  public async create(params: ICreateItemParams): Promise<Item | null> {
    const result = await super._create(classToPlain(new CreateItemParams(params)));

    const item = result ? plainToClass(Item, result) : null;

    return item;
  }

  public async patch(id: string, params: IPatchItemParams): Promise<Item | null> {
    const result = await super._patch(id, classToPlain(new PatchItemParams(params)));

    const item = result ? plainToClass(Item, result) : null;

    return item;
  }
}
