import { Expose } from 'class-transformer';

export class ItemCategory {
  public id!: string;
  public name!: string;
  @Expose({ name: 'view_order' })
  public viewOrder!: number;
  public description?: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
}
