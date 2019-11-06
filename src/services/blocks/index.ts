import { AxiosInstance } from 'axios';
import { Block } from '../../models/template';
import BaseService from '../base';
import { classToPlain, Expose, plainToClass } from 'class-transformer';

export interface ICreateBlockParams {}

export class CreateBlockParams implements ICreateBlockParams {
  constructor(createBlockParams: ICreateBlockParams) {
    Object.assign(this, createBlockParams);
  }
}

export interface IPatchBlockParams {}

export class PatchBlockParams implements IPatchBlockParams {
  constructor(patchBlockParams: IPatchBlockParams) {
    Object.assign(this, patchBlockParams);
  }
}

export default class BlocksService extends BaseService<Block> {
  constructor(axios: AxiosInstance) {
    super(axios, '/blocks');
  }

  public async list(offset?: number, limit?: number): Promise<Block[]> {
    const result = await super._list(offset, limit);

    const blocks = result ? plainToClass(Block, result) : [];

    return blocks;
  }

  public async get(id: string): Promise<Block | null> {
    const result = await super._get(id);

    const block = result ? plainToClass(Block, result) : null;

    return block;
  }

  public async create(params: ICreateBlockParams): Promise<Block | null> {
    const result = await super._create(classToPlain(new CreateBlockParams(params)));

    const block = result ? plainToClass(Block, result) : null;

    return block;
  }

  public async patch(id: string, params: IPatchBlockParams): Promise<Block | null> {
    const result = await super._patch(id, classToPlain(new PatchBlockParams(params)));

    const block = result ? plainToClass(Block, result) : null;

    return block;
  }
}
