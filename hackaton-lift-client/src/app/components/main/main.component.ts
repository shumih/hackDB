import {Component, ChangeDetectionStrategy, ViewChild, AfterViewInit, OnInit, ChangeDetectorRef, HostBinding} from '@angular/core';
import { MapsData } from '@core/models/maps/maps-data.model';
import { MapsComponent } from '../maps/maps.component';
import { Step, CoreService } from '@core/services/core.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit, AfterViewInit {
  @HostBinding('class') public currentStep: Step = 'question';
  private readonly START_POSITION_DEFAULT: [number, number] = [55.76, 37.64];
  private readonly ZOOM_DEFAULT = 5;

  @ViewChild('maps', { static: false }) maps: MapsComponent;

  mapsData: MapsData = {
    startPosition: this.START_POSITION_DEFAULT,
    zoom: this.ZOOM_DEFAULT,
  };

  constructor(public service: CoreService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.service.currentStep$.subscribe(currentStep => this.setWithChangeDetection({ currentStep }));
  }

  ngAfterViewInit() {
    navigator.geolocation.getCurrentPosition(e => {
      if (this.maps.map) {
        this.maps.setCenter([e.coords.latitude, e.coords.longitude], 18);
        return;
      }
      this.maps.onInitMap.subscribe(() => {
        this.maps.setCenter([e.coords.latitude, e.coords.longitude], 18);
      });
    });
  }

  private setWithChangeDetection(data: Partial<MainComponent>): void {
    Object.assign(this, data);
    this.cdRef.detectChanges();
  }
}
