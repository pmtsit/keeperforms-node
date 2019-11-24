import { Expose, Type } from 'class-transformer';
import { ItemCategory } from './item-category';
import { Post } from './post';
import { Supplier } from './supplier';
import { DocumentBlock } from './document-block';
import { Item } from './item';

export class Quantity {
  public id: string;
  @Type(() => Date)
  @Expose({ name: 'created_at' })
  public createdAt: Date;
  @Expose({ name: 'created_by' })
  public createdBy: string;
  @Type(() => DocumentBlock)
  @Expose({ name: 'document_block' })
  public documentBlock: DocumentBlock;
  @Type(() => Supplier)
  public supplier: Supplier;
  @Type(() => Item)
  public item: Item;
  public value: number;
  @Type(() => Post)
  public posts: Post[];
}

export class DailyReportSection {
  public id: string;
  @Expose({ name: 'section_type' })
  public sectionType: string;
  public title: string;
  @Expose({ name: 'view_order' })
  public viewOrder: number;
  @Type(() => Post)
  public posts: Post[];
}

export enum QuantityItemCategory {
  MANAGERS = 'managers',
  WORKERS = 'workers',
  SUB_CONTRACTORS = 'sub-contractors',
  EQUIPMENT = 'equipment',
  MATERIALS = 'materials',
}

export enum ProjectMemberRole {
  WORK_MANAGER = 'work_manager',
  SUPERVISOR = 'supervisor',
}

export interface IQuantityTotal {
  category: QuantityItemCategory;
  value: number;
}

export class QuantityItem {
  public id: string;
  public name: string;
  public category: QuantityItemCategory;
}

export class QuantityValue {
  public id: string;
  @Type(() => Supplier)
  public supplier?: Supplier;
  @Type(() => QuantityItem)
  public item: QuantityItem;
  public role: ProjectMemberRole;
  public value?: number;
  public notes?: string;
}
