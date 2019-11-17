import { Supplier } from './workspace';
import { Expose, Type } from 'class-transformer';
import { DocumentBlock } from './document';
import { ItemCategory } from './item-category';
import { Post } from './post';

export class Quantity {
  public id!: string;
  @Type(() => Date)
  @Expose({ name: 'created_at' })
  public createdAt!: Date;
  @Expose({ name: 'created_by' })
  public createdBy!: string;
  @Type(() => DocumentBlock)
  @Expose({ name: 'document_block' })
  public documentBlock!: DocumentBlock;
  @Type(() => Supplier)
  public supplier!: Supplier;
  @Type(() => Item)
  public item!: Item;
  public value!: number;
  @Type(() => Post)
  public posts!: Post[];
}

export class Item {
  public id!: string;
  public name!: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  public description?: string;
  @Type(() => ItemCategory)
  @Expose({ name: 'item_category' })
  public itemCategory?: ItemCategory;
}

export class DailyReportSection {
  public id!: string;
  @Expose({ name: 'section_type' })
  public sectionType!: string;
  public title!: string;
  @Expose({ name: 'view_order' })
  public viewOrder!: number;
  @Type(() => Post)
  public posts!: Post[];
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

export interface QuantityTotal {
  category: QuantityItemCategory;
  value: number;
}

export class QuantityItem {
  public id!: string;
  public name!: string;
  public category!: QuantityItemCategory;
}

export class QuantityValue {
  public id!: string;
  @Type(() => Supplier)
  public supplier?: Supplier;
  @Type(() => QuantityItem)
  public item!: QuantityItem;
  public role!: ProjectMemberRole;
  public value?: number;
  public notes?: string;
}
