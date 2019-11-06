import { DailyReportSection, Quantity } from './quantity';
import { DocumentBlock } from './document';
import { Expose } from 'class-transformer';

export class Post {
  public id!: string;
  @Expose({ name: 'created_by' })
  public createdBy!: User;
  @Expose({ name: 'created_at' })
  public createdAt!: Date;
  public text!: string | null;
  public attachments!: Attachment[];
  @Expose({ name: 'document_block' })
  public documentBlock?: DocumentBlock;
  public section?: DailyReportSection;
  public quantity?: Quantity;
}

export class Attachment {
  public title!: string;
  @Expose({ name: 'mime_type' })
  public mimeType!: string;
  public src!: string;
}

export class User {
  public bio!: string;
  public email!: string;
  @Expose({ name: 'first_name' })
  public firstName!: string;
  public id!: string;
  @Expose({ name: 'image_url' })
  public imageUrl?: string;
  @Expose({ name: 'last_name' })
  public lastName!: string;
  public slug!: string;
}
