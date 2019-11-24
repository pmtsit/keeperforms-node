import { Expose, Type } from 'class-transformer';
import { Block } from './block';

export class App {
  public id: string;
  public name: string;
  public description?: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  @Type(() => Block)
  public blocks?: Block[];
}
