import { Expose, Type } from 'class-transformer';

export class Project {
  public id!: string;
  public name!: string;
  @Type(() => Workspace)
  public workspace!: Workspace;
  @Type(() => Location)
  public location!: Location;
  public active!: boolean;
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

export class Workspace {
  public id!: string;
  public name!: string;
}

export interface Location {
  address?: string;
  latitude: number;
  longitude: number;
}

export class Place {
  public id!: string;
  public name!: string;
  public address?: string;
  public location?: {
    wkt: string;
    latitude?: number;
    longitude?: number;
  };
}

export class QuantitySettings {
  public active!: boolean;
  public style!: QuantitySectionStyle;
  public initReportWithPastItems!: boolean;
  public columns!: QuantitySectionColumnDefinition[];
}

export enum QuantitySectionStyle {
  NEW = 'new',
  OLD = 'old',
}

export interface QuantitySectionColumnDefinition {
  index: number;
  roles: ProjectMemberRole[];
  name: string;
}

export enum ProjectMemberRole {
  WORK_MANAGER = 'work_manager',
  SUPERVISOR = 'supervisor',
}

export class WeatherSettings {
  public weatherId!: string;
}
