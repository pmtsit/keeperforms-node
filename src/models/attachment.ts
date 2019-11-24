import { Expose } from 'class-transformer';

export class Attachment {
  public title: string;
  @Expose({ name: 'mime_type' })
  public mimeType: string;
  public src: string;
}
