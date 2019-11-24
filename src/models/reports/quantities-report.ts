import { Type } from 'class-transformer';
import { Quantity } from '../quantity';
import { QuantitiesReportCriteria } from './quantities-report-criteria';

export class QuantitiesReport {
  @Type(() => QuantitiesReportCriteria)
  public criteria: QuantitiesReportCriteria;
  @Type(() => Quantity)
  public quantities: Quantity[];
}
