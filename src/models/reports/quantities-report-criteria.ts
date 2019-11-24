import { Expose, Type } from 'class-transformer';
import { QuantitiesReportCriteriaSorting } from './quantities-report-criteria-sorting';

export class QuantitiesReportCriteria {
  @Type(() => Date)
  public start: Date;
  @Type(() => Date)
  public end: Date;
  public projects?: string[];
  @Expose({ name: 'template_blocks' })
  public templateBlocks?: string[];
  public suppliers?: string[];
  @Expose({ name: 'item_categories' })
  public itemCategories?: string[];
  public items?: string[];
  @Expose({ name: 'include_empty' })
  public includeEmpty: boolean;
  @Expose({ name: 'include_posts' })
  public includePosts: boolean;
  @Type(() => QuantitiesReportCriteriaSorting)
  public sorting?: QuantitiesReportCriteriaSorting;
}

