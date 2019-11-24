import { AxiosInstance } from 'axios';
import { Notification } from '../../models/notification';
import BaseService from '../base';
import { classToPlain, Expose, plainToClass } from 'class-transformer';

// tslint:disable-next-line:no-empty-interface
export interface ICreateNotificationParams {}

export class CreateNotificationParams implements ICreateNotificationParams {
  constructor(createNotificationParams: ICreateNotificationParams) {
    Object.assign(this, createNotificationParams);
  }
}

// tslint:disable-next-line:no-empty-interface
export interface IPatchNotificationParams {}

export class PatchNotificationParams implements IPatchNotificationParams {
  constructor(patchNotificationParams: IPatchNotificationParams) {
    Object.assign(this, patchNotificationParams);
  }
}

export default class NotificationsService extends BaseService<Notification> {
  constructor(axios: AxiosInstance) {
    super(axios, '/notifications');
  }

  public async list(offset?: number, limit?: number): Promise<Notification[]> {
    const result = await super._list(offset, limit);

    const notifications = result ? plainToClass(Notification, result) : [];

    return notifications;
  }

  public async get(id: string): Promise<Notification | null> {
    const result = await super._get(id);

    const notification = result ? plainToClass(Notification, result) : null;

    return notification;
  }

  public async create(params: ICreateNotificationParams): Promise<Notification | null> {
    throw new Error('User cannot create a notification');
    const result = await super._create(classToPlain(new CreateNotificationParams(params)));

    const notification = result ? plainToClass(Notification, result) : null;

    return notification;
  }

  public async patch(id: string, params: IPatchNotificationParams): Promise<Notification | null> {
    throw new Error('User cannot patch a notification');
    const result = await super._patch(id, classToPlain(new PatchNotificationParams(params)));

    const notification = result ? plainToClass(Notification, result) : null;

    return notification;
  }

  public async markRead(id: string): Promise<Notification | null> {
    if (!this.axios) {
      return null;
    }

    const result = await this.axios.post(`${this.endpoint}/${id}/read`, {});

    const data = result.data;

    const notification = data ? plainToClass(Notification, data) : null;

    return notification;
  }

  public async markArchive(id: string): Promise<Notification | null> {
    if (!this.axios) {
      return null;
    }

    const result = await this.axios.post(`${this.endpoint}/${id}/archive`, {});

    const data = result.data;

    const notification = data ? plainToClass(Notification, data) : null;

    return notification;
  }
}
