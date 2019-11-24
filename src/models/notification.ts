import { Expose, Type } from 'class-transformer';
import { TargetNode } from './target-node';

export class Notification {
  public id: string;
  @Type(() => Date)
  @Expose({ name: 'created_at' })
  public createdAt: Date;
  public title: string;
  public body?: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  @Expose({ name: 'is_read' })
  public isRead: boolean;
  @Type(() => TargetNode)
  public target?: TargetNode[];
}
