import { AxiosInstance } from 'axios';
import { Quantity } from '../../models/quantity';
import BaseService from '../base';
import { classToPlain, Expose, plainToClass } from 'class-transformer';

export interface ICreateQuantityParams {
  documentBlock: string;
  supplier: string;
  item: string;
  value?: number;
}

export class CreateQuantityParams implements ICreateQuantityParams {
  @Expose({ name: 'document_block' })
  public documentBlock!: string;
  public supplier!: string;
  public item!: string;
  public value?: number;

  constructor(createQuantityParams: ICreateQuantityParams) {
    Object.assign(this, createQuantityParams);
  }
}

export interface IPatchQuantityParams {
  value?: number;
}

export class PatchQuantityParams implements IPatchQuantityParams {
  public value?: number;

  constructor(patchQuantityParams: IPatchQuantityParams) {
    Object.assign(this, patchQuantityParams);
  }
}

export default class QuantitiesService extends BaseService<Quantity> {
  constructor(axios: AxiosInstance) {
    super(axios, '/quantities');
  }

  public async list(offset?: number, limit?: number): Promise<Quantity[]> {
    const result = await super._list(offset, limit);

    const quantities = result ? plainToClass(Quantity, result) : [];

    return quantities;
  }

  public async get(id: string): Promise<Quantity | null> {
    const result = await super._get(id);

    const quantity = result ? plainToClass(Quantity, result) : null;

    return quantity;
  }

  public async create(params: ICreateQuantityParams): Promise<Quantity | null> {
    const result = await super._create(classToPlain(new CreateQuantityParams(params)));

    const quantity = result ? plainToClass(Quantity, result) : null;

    return quantity;
  }

  public async patch(id: string, params: IPatchQuantityParams): Promise<Quantity | null> {
    const result = await super._patch(id, classToPlain(new PatchQuantityParams(params)));

    const quantity = result ? plainToClass(Quantity, result) : null;

    return quantity;
  }
}
