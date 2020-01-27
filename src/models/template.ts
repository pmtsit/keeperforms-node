import { Expose, Type } from 'class-transformer';
import { TemplateBlock } from './template-block';

export class Template {
  public id: string;
  public name: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  public description?: string;
  @Type(() => TemplateBlock)
  @Expose({ name: 'template_blocks' })
  public templateBlocks: TemplateBlock[];
  public version: number;
  @Expose({ name: 'requires_date' })
  public requiresDate: boolean;
  @Expose({ name: 'keep_date_unique_across_project' })
  public keepDateUniqueAcrossProject: boolean;
  public status: string;
}
