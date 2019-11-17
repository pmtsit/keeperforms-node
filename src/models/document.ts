import { Template, TemplateBlock } from './template';
import { Project, Place } from './project';
import { Quantity } from './quantity';
import { Post } from './post';
import { Expose, Type } from 'class-transformer';

export class Document {
  public id!: string;
  @Type(() => Template)
  public template!: Template;
  @Type(() => DocumentBlock)
  @Expose({ name: 'document_blocks' })
  public documentBlocks!: DocumentBlock[];
  @Type(() => Date)
  public date?: Date;
  @Type(() => Project)
  public project!: Project;
}

export class DocumentBlock {
  public id!: string;
  @Type(() => TemplateBlock)
  @Expose({ name: 'template_block' })
  public templateBlock!: TemplateBlock;
  @Type(() => Post)
  public posts!: Post[];
  @Type(() => WeatherForecast)
  @Expose({ name: 'weather_forecast' })
  public weatherForecast?: WeatherForecast;
  @Type(() => Quantity)
  public quantities?: Quantity[];
}

export class WeatherForecast {
  @Type(() => Date)
  public date!: Date;
  @Type(() => Place)
  public place?: Place;
  @Type(() => Date)
  public sunrise?: Date;
  @Type(() => Date)
  public sunset?: Date;
  public condition?: number;
  public temp?: number;
  @Expose({ name: 'temp_min' })
  public tempMin?: number;
  @Expose({ name: 'temp_max' })
  public tempMax?: number;
  public humidity?: number;
  public pressure?: number;
  @Expose({ name: 'pressure_at_sea' })
  public pressureAtSea?: number;
  @Expose({ name: 'pressure_at_ground' })
  public pressureAtGround?: number;
  @Expose({ name: 'wind_speed' })
  public windSpeed?: number;
  @Expose({ name: 'wind_degrees' })
  public windDegrees?: number;
  @Expose({ name: 'wind_gust' })
  public windGust?: number;
  public rain3h?: number;
  public snow3h?: number;
  public clouds?: number;
}
