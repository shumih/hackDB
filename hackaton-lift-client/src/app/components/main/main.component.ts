import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { MapsData } from '@core/models/maps/maps-data.model';
import { MapsComponent } from '../maps/maps.component';

export enum AddressType {
  Question,
  Padick,
  Address
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, AfterViewInit {
  public readonly AddressType = AddressType;
  private readonly START_POSITION_DEFAULT: [number, number] = [55.76, 37.64];
  private readonly ZOOM_DEFAULT = 5;

  public currentType: AddressType = AddressType.Question;

  @ViewChild('maps', { static: false }) maps: MapsComponent;

  mapsData: MapsData = {
    startPosition: this.START_POSITION_DEFAULT,
    zoom: this.ZOOM_DEFAULT,
  };

  constructor() { }

  ngOnInit() {

  }


  ngAfterViewInit() {
    navigator.geolocation.getCurrentPosition((e) => {
      this.maps.onInitMap.subscribe(() => {
        this.maps.setCenter([e.coords.latitude, e.coords.longitude], 18);
      });
    });
  }

  onNext(e: AddressType): void {
    this.currentType = e;
  }
}
