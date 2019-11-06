import { Expose } from 'class-transformer';

export class Notification {
  public id!: string;
  @Expose({ name: 'created_at' })
  public createdAt!: Date;
  public title!: string;
  public body?: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  @Expose({ name: 'is_read' })
  public isRead!: boolean;
  public target?: TargetNode[];
}
export interface TargetNode {
  type: string;
  id: string;
  name?: string;
}
