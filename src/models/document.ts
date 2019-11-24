import { Template } from './template';
import { Project } from './project';
import { Expose, Type } from 'class-transformer';
import { DocumentBlock } from './document-block';

export class Document {
  public id: string;
  @Type(() => Template)
  public template: Template;
  @Type(() => DocumentBlock)
  @Expose({ name: 'document_blocks' })
  public documentBlocks: DocumentBlock[];
  @Type(() => Date)
  public date?: Date;
  @Type(() => Project)
  public project: Project;
}

