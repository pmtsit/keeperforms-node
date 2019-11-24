import { Expose } from 'class-transformer';

export class User {
  public bio!: string;
  public email!: string;
  @Expose({ name: 'first_name' })
  public firstName!: string;
  public id!: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  @Expose({ name: 'last_name' })
  public lastName!: string;
  public slug!: string;
}
