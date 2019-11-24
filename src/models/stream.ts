import { Expose, Type } from 'class-transformer';
import { Project } from './project';
import { TemplateBlock } from './template-block';

export class Stream {
  public id: string;
  public name: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  public description?: string;
  public slug: string;
  @Type(() => Project)
  public projects?: Project[];
  @Type(() => TemplateBlock)
  @Expose({ name: 'template_blocks' })
  public templateBlocks?: TemplateBlock[];
}
