import { Expose, Type } from 'class-transformer';
import { Workspace } from './workspace';
import { QuantitySettings } from './quantity-settings';
import { Place } from './place';
import { WeatherSettings } from './weather-settings';
import { ILocation } from './location.interface';

export class Project {
  public id: string;
  public name: string;
  @Type(() => Workspace)
  public workspace: Workspace;
  @Type(() => Location)
  public location: ILocation;
  public active: boolean;
  public place?: Place;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  public description?: string;
  @Type(() => QuantitySettings)
  @Expose({ name: 'quantity_settings' })
  public quantitySettings?: QuantitySettings;
  @Type(() => WeatherSettings)
  @Expose({ name: 'weather_settings' })
  public weatherSettings?: WeatherSettings;
}

export enum QuantitySectionStyle {
  NEW = 'new',
  OLD = 'old',
}

export interface IQuantitySectionColumnDefinition {
  index: number;
  roles: ProjectMemberRole[];
  name: string;
}

export enum ProjectMemberRole {
  WORK_MANAGER = 'work_manager',
  SUPERVISOR = 'supervisor',
}
