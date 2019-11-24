import { AxiosInstance } from 'axios';
import { ItemCategory } from '../../models/item-category';
import BaseService from '../base';
import { classToPlain, Expose, plainToClass } from 'class-transformer';

export interface ICreateItemCategoryParams {
  workspace: string;
  name: string;
  imageUrl?: string;
  description?: string;
}

export class CreateItemCategoryParams implements ICreateItemCategoryParams {
  public workspace!: string;
  public name!: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  public description?: string;

  constructor(createItemCategoryParams: ICreateItemCategoryParams) {
    Object.assign(this, createItemCategoryParams);
  }
}

export interface IPatchItemCategoryParams {
  name?: string;
  description?: string;
  imageUrl?: string;
}

export class PatchItemCategoryParams implements IPatchItemCategoryParams {
  public name?: string;
  public description?: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;

  constructor(patchItemCategoryParams: IPatchItemCategoryParams) {
    Object.assign(this, patchItemCategoryParams);
  }
}

export default class ItemCategoriesService extends BaseService<ItemCategory> {
  constructor(axios: AxiosInstance) {
    super(axios, '/item-categories');
  }

  public async list(offset?: number, limit?: number): Promise<ItemCategory[]> {
    const result = await super._list(offset, limit);

    const itemCategories = result ? plainToClass(ItemCategory, result) : [];

    return itemCategories;
  }

  public async get(id: string): Promise<ItemCategory | null> {
    const result = await super._get(id);

    const itemCategory = result ? plainToClass(ItemCategory, result) : null;

    return itemCategory;
  }

  public async create(params: ICreateItemCategoryParams): Promise<ItemCategory | null> {
    const result = await super._create(classToPlain(new CreateItemCategoryParams(params)));

    const itemCategory = result ? plainToClass(ItemCategory, result) : null;

    return itemCategory;
  }

  public async patch(id: string, params: IPatchItemCategoryParams): Promise<ItemCategory | null> {
    const result = await super._patch(id, classToPlain(new PatchItemCategoryParams(params)));

    const itemCategory = result ? plainToClass(ItemCategory, result) : null;

    return itemCategory;
  }
}
