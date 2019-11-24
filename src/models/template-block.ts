import { Expose, Type } from 'class-transformer';
import { Block } from './block';

export class TemplateBlock {
  public id: string;
  public title?: string;
  @Expose({ name: 'sub_title' })
  public subTitle?: string;
  @Expose({ name: 'view_order' })
  public viewOrder: number;
  @Type(() => Block)
  public block: Block;
}
