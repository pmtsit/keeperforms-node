import { Expose } from 'class-transformer';

export class Alert {
  public id!: string;
  public start!: Date;
  public end!: Date;
  public message!: string;
  public variant!: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | undefined;
  @Expose({ name: 'view_order' })
  public viewOrder?: number;
}
