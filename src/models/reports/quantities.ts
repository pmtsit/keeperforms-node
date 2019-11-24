import { Expose, Type } from 'class-transformer';
import { Quantity } from '../quantity';

export class QuantitiesReportCriteria {
  @Type(() => Date)
  public start!: Date;
  @Type(() => Date)
  public end!: Date;
  public projects?: string[];
  @Expose({ name: 'template_blocks' })
  public templateBlocks?: string[];
  public suppliers?: string[];
  @Expose({ name: 'item_categories' })
  public itemCategories?: string[];
  public items?: string[];
  @Expose({ name: 'include_empty' })
  public includeEmpty!: boolean;
  @Expose({ name: 'include_posts' })
  public includePosts!: boolean;
  @Type(() => QuantitiesReportCriteriaSorting)
  public sorting?: QuantitiesReportCriteriaSorting;
}

export class QuantitiesReport {
  @Type(() => QuantitiesReportCriteria)
  public criteria!: QuantitiesReportCriteria;
  @Type(() => Quantity)
  public quantities!: Quantity[];
}

export class QuantitiesReportCriteriaSorting {
  public by!: 'date' | 'project' | 'supplier' | 'item-category' | 'item' | 'quantity';
  public order!: 'asc' | 'desc';
}
