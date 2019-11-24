import { DailyReportSection, Quantity } from './quantity';
import { Expose, Type } from 'class-transformer';
import { User } from './user';
import { DocumentBlock } from './document-block';
import { Attachment } from './attachment';

export class Post {
  public id: string;
  @Type(() => User)
  @Expose({ name: 'created_by' })
  public createdBy: User;
  @Type(() => Date)
  @Expose({ name: 'created_at' })
  public createdAt: Date;
  public text: string | null;
  @Type(() => Attachment)
  public attachments: Attachment[];
  @Type(() => DocumentBlock)
  @Expose({ name: 'document_block' })
  public documentBlock?: DocumentBlock;
  @Type(() => DailyReportSection)
  public section?: DailyReportSection;
  @Type(() => Quantity)
  public quantity?: Quantity;
}

