import { AxiosInstance } from 'axios';
import { Supplier } from '../../models/workspace';
import BaseService from '../base';
import { classToPlain, Expose, plainToClass } from 'class-transformer';

export interface ICreateSupplierParams {
  workspace: string;
  name: string;
  imageUrl?: string;
  description?: string;
}

export class CreateSupplierParams implements ICreateSupplierParams {
  public workspace!: string;
  public name!: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  public description?: string;

  constructor(createSupplierParams: ICreateSupplierParams) {
    Object.assign(this, createSupplierParams);
  }
}

export interface IPatchSupplierParams {
  name?: string;
  description?: string;
  imageUrl?: string;
}

export class PatchSupplierParams implements IPatchSupplierParams {
  name?: string;
  description?: string;
  @Expose({ name: 'image_url' })
  imageUrl?: string;

  constructor(patchSupplierParams: IPatchSupplierParams) {
    Object.assign(this, patchSupplierParams);
  }
}

export default class SuppliersService extends BaseService<Supplier> {
  constructor(axios: AxiosInstance) {
    super(axios, '/suppliers');
  }

  public async list(offset?: number, limit?: number): Promise<Supplier[]> {
    const result = await super._list(offset, limit);

    const suppliers = result ? plainToClass(Supplier, result) : [];

    return suppliers;
  }

  public async get(id: string): Promise<Supplier | null> {
    const result = await super._get(id);

    const supplier = result ? plainToClass(Supplier, result) : null;

    return supplier;
  }

  public async create(params: ICreateSupplierParams): Promise<Supplier | null> {
    const result = await super._create(classToPlain(new CreateSupplierParams(params)));

    const supplier = result ? plainToClass(Supplier, result) : null;

    return supplier;
  }

  public async patch(id: string, params: IPatchSupplierParams): Promise<Supplier | null> {
    const result = await super._patch(id, classToPlain(new PatchSupplierParams(params)));

    const supplier = result ? plainToClass(Supplier, result) : null;

    return supplier;
  }
}
