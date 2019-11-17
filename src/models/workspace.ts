import { Expose, Type } from 'class-transformer';

export class Workspace {
  public id!: string;
  public name!: string;
  public slug!: string;
  public description?: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  @Type(() => Supplier)
  public suppliers!: Supplier[];
}

export class Supplier {
  public id!: string;
  public name!: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  public description?: string;
}
