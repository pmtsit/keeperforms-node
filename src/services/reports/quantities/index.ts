import { AxiosInstance } from 'axios';
import { Quantity } from '../../../models/quantity';
import BaseService from '../../base';
import { classToPlain, Expose, plainToClass } from 'class-transformer';

export interface ICreateQuantityParams {
  documentBlock: string;
  supplier: string;
  item: string;
  value?: number;
}

export class CreateQuantityParams implements ICreateQuantityParams {
  @Expose({ name: 'document_block' })
  public documentBlock: string;
  public supplier: string;
  public item: string;
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

export default class QuantitiesReportService extends BaseService<Quantity> {
  constructor(axios: AxiosInstance) {
    super(axios, '/reports/quantities');
  }
}
