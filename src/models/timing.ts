import { Type } from 'class-transformer';

export class Timing {
  @Type(() => Date)
  public start?: Date;
  @Type(() => Date)
  public end?: Date;
}
