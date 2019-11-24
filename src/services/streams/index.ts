import { AxiosInstance } from 'axios';
import BaseService from '../base';
import { classToPlain, Expose, plainToClass } from 'class-transformer';
import { Post } from '../../models/post';
import { Stream } from '../../models/stream';

export interface ICreateStreamParams {
  workspace: string;
  name: string;
  imageUrl?: string;
  description?: string;
  projects?: string[];
  templateBlocks?: string[];
}

export class CreateStreamParams implements ICreateStreamParams {
  public workspace!: string;
  public name!: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  public description?: string;
  public projects?: string[];
  @Expose({ name: 'template_blocks' })
  public templateBlocks?: string[];

  constructor(createStreamParams: ICreateStreamParams) {
    Object.assign(this, createStreamParams);
  }
}

export interface IPatchStreamParams {
  name?: string;
  description?: string;
  imageUrl?: string;
  projects?: string[];
  templateBlocks?: string[];
}

export class PatchStreamParams implements IPatchStreamParams {
  public name?: string;
  public description?: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  public projects?: string[];
  @Expose({ name: 'template_blocks' })
  public templateBlocks?: string[];

  constructor(patchStreamParams: IPatchStreamParams) {
    Object.assign(this, patchStreamParams);
  }
}

export default class StreamsService extends BaseService<Stream> {
  constructor(axios: AxiosInstance) {
    super(axios, '/streams');
  }

  public async list(offset?: number, limit?: number): Promise<Stream[]> {
    const result = await super._list(offset, limit);

    const streams = result ? plainToClass(Stream, result) : [];

    return streams;
  }

  public async get(id: string): Promise<Stream | null> {
    const result = await super._get(id);

    const stream = result ? plainToClass(Stream, result) : null;

    return stream;
  }

  public async create(params: ICreateStreamParams): Promise<Stream | null> {
    const result = await super._create(classToPlain(new CreateStreamParams(params)));

    const stream = result ? plainToClass(Stream, result) : null;

    return stream;
  }

  public async patch(id: string, params: IPatchStreamParams): Promise<Stream | null> {
    const result = await super._patch(id, classToPlain(new PatchStreamParams(params)));

    const stream = result ? plainToClass(Stream, result) : null;

    return stream;
  }

  public async feed(stream: string, offset?: number, limit?: number): Promise<Post[]> {
    if (!this.axios) {
      return [];
    }

    const params: any = {
      limit,
      offset,
    };

    const result = await this.axios.get(`${this.endpoint}/${stream}/feed/`, params);

    const data = result.data;

    const posts = data ? plainToClass(Post, data) : [];

    return posts as Post[];
  }

}
