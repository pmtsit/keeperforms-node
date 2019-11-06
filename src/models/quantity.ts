import { Supplier } from './workspace';
import { Block } from './template';
import { Expose } from 'class-transformer';
import { Place } from './project';
import { DocumentBlock } from './document';
import { ItemCategory } from './item-category';
import { Post } from './post';

export class Quantity {
  public id!: string;
  @Expose({ name: 'created_at' })
  public createdAt!: Date;
  @Expose({ name: 'created_by' })
  public createdBy!: string;
  @Expose({ name: 'document_block' })
  public documentBlock!: DocumentBlock;
  public supplier!: Supplier;
  public item!: Item;
  public value!: number;
  public posts!: Post[];
}

export class Item {
  public id!: string;
  public name!: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  public description?: string;
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

export interface QuantityItem {
  id: string;
  name: string;
  category: QuantityItemCategory;
}

export interface QuantityValue {
  id: string;
  supplier?: Supplier;
  item: QuantityItem;
  role: ProjectMemberRole;
  value?: number;
  notes?: string;
}
