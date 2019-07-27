import { Coordinates } from './maps-coordinates.type';
import { Type, EventEmitter, Injector } from '@angular/core';
import { MapsComponent } from '@core/components/maps/maps.component';

export interface MapsData {
  startPosition?: Coordinates;
  zoom?: number;
  componentBalloon?: string | Type<any>;
  balloonData?: any;
  searchPanel?: boolean;
  injector?: Injector;
  panelComponent?: Type<any>;
  onInitialize?: EventEmitter<MapsComponent>;
  onDestroy?: EventEmitter<void>;
  onChangeBounds?: EventEmitter<number[]>;
}
