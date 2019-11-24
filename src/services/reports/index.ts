import BaseService from '../base';
import { AxiosInstance } from 'axios';
import QuantitiesReportService from './quantities';
import { QuantitiesReportCriteria, QuantitiesReport } from '../../models/reports/quantities';
import { plainToClass } from 'class-transformer';

export default class ReportsService extends BaseService<any> {
  public readonly quantities: QuantitiesReportService;

  constructor(axios: AxiosInstance) {
    super(axios, '/reports');

    this.quantities = new QuantitiesReportService(this.axios!);
  }

  public async getQuantitiesReport(criteria: QuantitiesReportCriteria): Promise<QuantitiesReport | null> {
    if (!this.axios) {
      return null;
    }

    const result = await this.axios!.get(this.endpoint + '/quantities', {
      params: {
        ...criteria,
        item_categories: criteria.itemCategories,
        include_empty: criteria.includeEmpty,
        include_posts: criteria.includePosts,
      },
    }).then(res => res.data);

    const quantitiesReport = result ? plainToClass(QuantitiesReport, result) : null;

    return quantitiesReport;
  }
}
