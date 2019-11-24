import { Expose } from 'class-transformer';

export class Supplier {
  public id: string;
  public name: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  public description?: string;
}
