import { AxiosInstance } from 'axios';
import { Post} from '../../models/post';
import BaseService from '../base';
import { classToPlain, Expose, plainToClass } from 'class-transformer';
import { Attachment } from '../../models/attachment';

export interface ICreatePostParams {
  project: string;
  documentBlock: string;
  text: string;
  attachments?: Attachment[];
}

export class CreatePostParams implements ICreatePostParams {
  public project: string;
  @Expose({ name: 'document_block' })
  public documentBlock: string;
  public text: string;
  public attachments?: Attachment[];

  constructor(createPostParams: ICreatePostParams) {
    Object.assign(this, createPostParams);
  }
}

export interface IPatchPostParams {
  text?: string;
  attachments?: Attachment[];
}

export class PatchPostParams implements IPatchPostParams {
  public text?: string;
  public attachments?: Attachment[];

  constructor(patchPostParams: IPatchPostParams) {
    Object.assign(this, patchPostParams);
  }
}

export default class PostsService extends BaseService<Post> {
  constructor(axios: AxiosInstance) {
    super(axios, '/posts');
  }

  public async list(offset?: number, limit?: number): Promise<Post[]> {
    const result = await super._list(offset, limit);

    const posts = result ? plainToClass(Post, result) : [];

    return posts;
  }

  public async get(id: string): Promise<Post | null> {
    const result = await super._get(id);

    const post = result ? plainToClass(Post, result) : null;

    return post;
  }

  public async create(params: ICreatePostParams): Promise<Post | null> {
    const result = await super._create(classToPlain(new CreatePostParams(params)));

    const post = result ? plainToClass(Post, result) : null;

    return post;
  }

  public async patch(id: string, params: IPatchPostParams): Promise<Post | null> {
    const result = await super._patch(id, classToPlain(new PatchPostParams(params)));

    const post = result ? plainToClass(Post, result) : null;

    return post;
  }
}
