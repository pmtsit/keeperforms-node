import { Expose } from 'class-transformer';

export class Template {
  public id!: string;
  public name!: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  public description?: string;
  @Expose({ name: 'template_blocks' })
  public templateBlocks!: TemplateBlock[];
  public version!: number;
  @Expose({ name: 'requires_date' })
  public requiresDate!: boolean;
  @Expose({ name: 'keep_date_unique_acroos_project' })
  public keepDateUniqueAcrossProject!: boolean;
}

export class TemplateBlock {
  public id!: string;
  public title?: string;
  @Expose({ name: 'sub_title' })
  public subTitle?: string;
  @Expose({ name: 'view_order' })
  public viewOrder!: number;
  public block!: Block;
}

export class Block {
  public id!: string;
  public app?: App;
  public key!: string;
  public name!: string;
  public description?: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
}

export class App {
  public id!: string;
  public name!: string;
  public description?: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  public blocks?: Block[];
}
