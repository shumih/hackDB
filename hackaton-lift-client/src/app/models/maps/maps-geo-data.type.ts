import { Coordinates } from './maps-coordinates.type';

export interface MapsGeoData {
  coordinates: Coordinates;
  name: string;
  text: string;
  selected?: boolean;
}
