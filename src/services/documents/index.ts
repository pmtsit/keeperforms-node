import { AxiosInstance } from 'axios';
import { Document } from '../../models/document';
import BaseService from '../base';
import { classToPlain, Expose, plainToClass } from 'class-transformer';

export interface ICreateDocumentParams {
  project: string;
  template: string;
  date?: Date;
}

export class CreateDocumentParams implements ICreateDocumentParams {
  public project!: string;
  public template!: string;
  public date?: Date;

  constructor(createDocumentParams: ICreateDocumentParams) {
    Object.assign(this, createDocumentParams);
  }
}

export interface IPatchDocumentParams {
  date?: Date;
}

export class PatchDocumentParams implements IPatchDocumentParams {
  public date?: Date;

  constructor(patchDocumentParams: IPatchDocumentParams) {
    Object.assign(this, patchDocumentParams);
  }
}

export default class DocumentsService extends BaseService<Document> {
  constructor(axios: AxiosInstance) {
    super(axios, '/documents');
  }

  public async list(offset?: number, limit?: number): Promise<Document[]> {
    const result = await super._list(offset, limit);

    const documents = result ? plainToClass(Document, result) : [];

    return documents;
  }

  public async get(id: string): Promise<Document | null> {
    const result = await super._get(id);

    const document = result ? plainToClass(Document, result) : null;

    return document;
  }

  public async create(params: ICreateDocumentParams): Promise<Document | null> {
    const result = await super._create(classToPlain(new CreateDocumentParams(params)));

    const document = result ? plainToClass(Document, result) : null;

    return document;
  }

  public async patch(id: string, params: IPatchDocumentParams): Promise<Document | null> {
    const result = await super._patch(id, classToPlain(new PatchDocumentParams(params)));

    const document = result ? plainToClass(Document, result) : null;

    return document;
  }
}
