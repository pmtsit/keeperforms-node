import { Expose, Type } from 'class-transformer';
import { TemplateBlock } from './template-block';
import { Post } from './post';
import { Quantity } from './quantity';
import { Document as DocumentEntity } from './document';
import { WeatherForecast } from './weather-forecast';

export class DocumentBlock {
  public id: string;
  @Type(() => TemplateBlock)
  @Expose({ name: 'template_block' })
  public templateBlock: TemplateBlock;
  @Type(() => Post)
  public posts: Post[];
  @Type(() => DocumentEntity)
  public document?: DocumentEntity;
  @Type(() => WeatherForecast)
  @Expose({ name: 'weather_forecast' })
  public weatherForecast?: WeatherForecast;
  @Type(() => Quantity)
  public quantities?: Quantity[];
}
