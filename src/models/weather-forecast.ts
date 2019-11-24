import { Expose, Type } from 'class-transformer';
import { Place } from './place';

export class WeatherForecast {
  @Type(() => Date)
  public date: Date;
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
