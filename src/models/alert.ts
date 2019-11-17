import { Expose, Type } from 'class-transformer';

export class Alert {
  public id!: string;
  @Type(() => Date)
  public start!: Date;
  @Type(() => Date)
  public end!: Date;
  public message!: string;
  public variant!: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | undefined;
  @Expose({ name: 'view_order' })
  public viewOrder?: number;
}
