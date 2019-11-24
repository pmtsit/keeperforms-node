import { Expose, Type } from 'class-transformer';
import { App } from './app';

export class Block {
  public id: string;
  @Type(() => App)
  public app?: App;
  public key: string;
  public name: string;
  public description?: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
}
