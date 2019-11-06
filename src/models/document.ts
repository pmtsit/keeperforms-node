import { Template, TemplateBlock } from './template';
import { Project, Place } from './project';
import { Quantity } from './quantity';
import { Post } from './post';
import { Expose } from 'class-transformer';

export class Document {
  public id!: string;
  public template!: Template;
  @Expose({ name: 'document_blocks' })
  public documentBlocks!: DocumentBlock[];
  public date?: Date;
  public project!: Project;
}

export interface DocumentBlock {
  id: string;
  templateBlock: TemplateBlock;
  posts: Post[];
  weatherForecast?: WeatherForecast;
  quantities?: Quantity[];
}

export interface WeatherForecast {
  date: Date;
  place?: Place;
  sunrise?: Date;
  sunset?: Date;
  condition?: number;
  temp?: number;
  tempMin?: number;
  tempMax?: number;
  humidity?: number;
  pressure?: number;
  pressureAtSea?: number;
  pressureAtGround?: number;
  windSpeed?: number;
  windDegrees?: number;
  windGust?: number;
  rain3h?: number;
  snow3h?: number;
  clouds?: number;
}
