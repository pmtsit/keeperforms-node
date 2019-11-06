import { Expose } from 'class-transformer';
import { ItemCategory } from './item-category';

export class Item {
  public id!: string;
  public name!: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  public description?: string;
  @Expose({ name: 'item_category' })
  public itemCategory?: ItemCategory;
}
