import { classToPlain, Expose, plainToClass, Type } from 'class-transformer';

export class Project {
  public id!: string;
  public name!: string;
  public workspace!: Workspace;
  public location!: Location;
  public active!: boolean;
  public place?: Place;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  public description?: string;
  @Expose({ name: 'quantity_settings' })
  public quantitySettings?: QuantitySettings;
  @Expose({ name: 'weather_settings' })
  public weatherSettings?: WeatherSettings;
}

export interface Workspace {
  id: string;
  name: string;
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

export interface QuantitySettings {
  active: boolean;
  style: QuantitySectionStyle;
  initReportWithPastItems: boolean;
  columns: QuantitySectionColumnDefinition[];
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

export interface WeatherSettings {
  weatherId: string;
}
