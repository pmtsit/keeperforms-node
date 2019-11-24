import { Expose, Type } from 'class-transformer';
import { Supplier } from './supplier';

export class Workspace {
  public id: string;
  public name: string;
  public slug: string;
  public description?: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  @Type(() => Supplier)
  public suppliers: Supplier[];
}
