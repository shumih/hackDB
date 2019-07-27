import { MapsGeoData } from './maps-geo-data.type';

export interface MapsGeo {
  found: number;
  request: string;
  result: number;
  data: MapsGeoData[];
}
