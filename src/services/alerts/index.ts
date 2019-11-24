import { AxiosInstance } from 'axios';
import { Alert } from '../../models/alert';
import BaseService from '../base';
import { classToPlain, Expose, plainToClass } from 'class-transformer';

export interface ICreateAlertParams {
  message: string;
  start: Date;
  end: Date;
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | undefined;
}

export class CreateAlertParams implements ICreateAlertParams {
  public message: string;
  public start: Date;
  public end: Date;
  public variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | undefined;

  constructor(createAlertParams: ICreateAlertParams) {
    Object.assign(this, createAlertParams);
  }
}

export interface IPatchAlertParams {
  message?: string;
  start?: Date;
  end?: Date;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | undefined;
}

export class PatchAlertParams implements IPatchAlertParams {
  public message?: string;
  public start?: Date;
  public end?: Date;
  public variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | undefined;

  constructor(patchAlertParams: IPatchAlertParams) {
    Object.assign(this, patchAlertParams);
  }
}

export default class AlertsService extends BaseService<Alert> {
  constructor(axios: AxiosInstance) {
    super(axios, '/alerts');
  }

  public async list(offset?: number, limit?: number): Promise<Alert[]> {
    const result = await super._list(offset, limit);

    const alerts = result ? plainToClass(Alert, result) : [];

    return alerts;
  }

  public async get(id: string): Promise<Alert | null> {
    const result = await super._get(id);

    const alert = result ? plainToClass(Alert, result) : null;

    return alert;
  }

  public async create(params: ICreateAlertParams): Promise<Alert | null> {
    const result = await super._create(classToPlain(new CreateAlertParams(params)));

    const alert = result ? plainToClass(Alert, result) : null;

    return alert;
  }

  public async patch(id: string, params: IPatchAlertParams): Promise<Alert | null> {
    const result = await super._patch(id, classToPlain(new PatchAlertParams(params)));

    const alert = result ? plainToClass(Alert, result) : null;

    return alert;
  }
}
