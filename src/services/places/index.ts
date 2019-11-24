import { AxiosInstance } from 'axios';
import BaseService from '../base';
import { classToPlain, Expose, plainToClass } from 'class-transformer';
import { Place } from '../../models/place';

export interface ICreatePlaceParams {
  name: string;
  description?: string;
  imageUrl?: string;
  address?: string;
  googlePlaceId?: string;
  location?: string;
}

export class CreatePlaceParams implements ICreatePlaceParams {
  public name: string;
  public description?: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  public address?: string;
  @Expose({ name: 'google_place_id' })
  public googlePlaceId?: string;
  public location?: string;

  constructor(createPlaceParams: ICreatePlaceParams) {
    Object.assign(this, createPlaceParams);
  }
}

export interface IPatchPlaceParams {
  name?: string;
  description?: string;
  imageUrl?: string;
  address?: string;
  googlePlaceId?: string;
  location?: string;
}

export class PatchPlaceParams implements IPatchPlaceParams {
  public name?: string;
  public description?: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  public address?: string;
  @Expose({ name: 'google_place_id' })
  public googlePlaceId?: string;
  public location?: string;

  constructor(patchPlaceParams: IPatchPlaceParams) {
    Object.assign(this, patchPlaceParams);
  }
}

export default class PlacesService extends BaseService<Place> {
  constructor(axios: AxiosInstance) {
    super(axios, '/places');
  }

  public async list(offset?: number, limit?: number): Promise<Place[]> {
    const result = await super._list(offset, limit);

    const places = result ? plainToClass(Place, result) : [];

    return places;
  }

  public async get(id: string): Promise<Place | null> {
    const result = await super._get(id);

    const place = result ? plainToClass(Place, result) : null;

    return place;
  }

  public async create(params: ICreatePlaceParams): Promise<Place | null> {
    const result = await super._create(classToPlain(new CreatePlaceParams(params)));

    const place = result ? plainToClass(Place, result) : null;

    return place;
  }

  public async patch(id: string, params: IPatchPlaceParams): Promise<Place | null> {
    const result = await super._patch(id, classToPlain(new PatchPlaceParams(params)));

    const place = result ? plainToClass(Place, result) : null;

    return place;
  }
}
