export class Place {
  public id: string;
  public name: string;
  public address?: string;
  public location?: {
    wkt: string;
    latitude?: number;
    longitude?: number;
  };
}
