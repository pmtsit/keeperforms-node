import { IQuantitySectionColumnDefinition, QuantitySectionStyle } from './project';

export class QuantitySettings {
  public active: boolean;
  public style: QuantitySectionStyle;
  public initReportWithPastItems: boolean;
  public columns: IQuantitySectionColumnDefinition[];
}
