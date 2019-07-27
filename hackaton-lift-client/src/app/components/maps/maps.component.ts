
import { Component, OnInit, ViewChild, Injector, ElementRef, OnDestroy, Renderer2,
  ApplicationRef, ComponentRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { MapsLoaderService } from '@core/services/maps/maps-loader.service';
import { MapsData } from '@core/models/maps/maps-data.model';
import { MapsMarker } from '@core/models/maps/maps-marker.model';

declare var ymaps: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  providers: [MapsLoaderService]
})
export class MapsComponent implements OnInit, OnDestroy {
  private readonly MARKER_IMAGE = 'assets/images/icons/svg/marker.svg';
  private readonly ICON_LAYOUT_DEFAULT = 'default#image';
  private readonly ICON_SIZE = 42;
  private readonly MAP_CONTROLS = ['zoomControl'];

  @ViewChild('mapContainer', { static: true }) mapContainer: ElementRef;

  public map: any;
  public onInitMap: Subject<MapsComponent> = new Subject<MapsComponent>();
  @Input() data: MapsData;
  public injector: Injector;

  private _cluster: any;
  private _ids: any[] = [];

  constructor(
    public serviceLoader: MapsLoaderService,
    private _injector: Injector,
    private _applicationRef: ApplicationRef,
    private _renderer: Renderer2,
  ) {
  }

  ngOnInit() {
    this._createMap(this.mapContainer.nativeElement, {
      center: this.data.startPosition,
      controls: this.MAP_CONTROLS,
      zoom: this.data.zoom
    });

    this.injector = Injector.create({
      providers: [{
        provide: 'maps', useValue: this
      }],
      parent: this.data.injector || this._injector
    });

    this.onInitMap.subscribe((e) => {
      const location = ymaps.geolocation.get();
      // Асинхронная обработка ответа.
      location.then(
        function(result) {
          // Добавление местоположения на карту.
          this.map.geoObjects.add(result.geoObjects);
        },
        function(err) {
          console.log('Ошибка: ' + err);
        }
      );
    })
  }

  ngOnDestroy() {
    this.clear();
    this.map.destroy();
    this.data.onDestroy.emit();
  }

  public addMarker(marker: MapsMarker) {
    this._addMarkerToMap(marker);
  }

  public setMarkers(markers: MapsMarker[]): void {
    this.clear();
    markers.forEach(this._addMarkerToMap.bind(this));
  }

  public addMarkers(markers: MapsMarker[]): void {
    const objects = [];
    markers.forEach(item => {
      if (this._ids.indexOf(item.id) > -1) {
        return;
      }
      objects.push(this._createMarker(item));
      this._ids.push(item.id);
    });

    if (!this._cluster) {
      this._cluster = ymaps.geoQuery(objects).clusterize({
        preset: 'islands#invertedVioletClusterIcons'
      });
      this.map.geoObjects.add(this._cluster);

      return;
    }

    this._cluster.add(objects);
  }

  public clear(): void {
    this.map.geoObjects.removeAll();
  }

  public openById(id: any): void {
    const target = this._cluster.getGeoObjects().find(placemark => placemark.properties._data.id === id);
    const coords = target.geometry.getCoordinates();
    this.map.setCenter(coords, 15);
    target.balloon.open(coords);
  }

  public setCenter(coords: [number, number], zoom: number): void {
    this.map.setCenter(coords, zoom);
  }

  private _createMap(el: HTMLElement, mapOptions): void {
    const create = () => {
      ymaps.ready().done(() => {
        this.map = new ymaps.Map(el, mapOptions);
        this.onInitMap.next(this);
        this.map.events.add('boundschange', this._onBoundsChange.bind(this));
        this._onBoundsChange();
      });
    };

    if (this._isYaSciptLoaded()) {
      create();
      return;
    }

    this.serviceLoader.load().subscribe(() => {
      create();
    }, (e) => console.error(e));
  }

  private _isYaSciptLoaded(): HTMLElement {
    return document.getElementById(this.serviceLoader.SCRIPT_MAPS_ID);
  }

  private _addMarkerToMap(marker: MapsMarker): void {
    this.map.geoObjects.add(this._createMarker(marker));
  }

  private _createMarker(marker: MapsMarker): any {
    const instance = this;
    let componentRef: ComponentRef<any>;
    const MyBalloonLayout = ymaps.templateLayoutFactory.createClass('', {
      build() {
        this.constructor.superclass.build.call(this);
        if (!instance.data.componentBalloon) {
          return;
        }

        componentRef = instance.serviceLoader.loadComponent(
          instance.data.componentBalloon,
          instance.injector,
        );
        componentRef.onDestroy(() => {
          instance._applicationRef.detachView(componentRef.hostView);
        });
        instance._renderer.appendChild(this._element, componentRef.location.nativeElement);
        instance._applicationRef.attachView(componentRef.hostView);
        componentRef.instance.data = marker.data;
        componentRef.hostView.detectChanges();
    },
    clear() {
      if (componentRef) {
        componentRef.destroy();
      }
      this.constructor.superclass.clear.call(this);
    }
    });

    return new ymaps.Placemark(marker.coordinates, { id: marker.id },
      {
        hideIconOnBalloonOpen: false,
        iconLayout: this.ICON_LAYOUT_DEFAULT,
        iconImageHref: this.MARKER_IMAGE,
        iconImageSize: [this.ICON_SIZE, this.ICON_SIZE],
        iconImageOffset: [-(this.ICON_SIZE / 2), 0],
        balloonContentLayout: MyBalloonLayout,
        openEmptyBalloon: !!instance.data.componentBalloon
      }
    );
  }

  private _onBoundsChange(): void {
    // this.data.onChangeBounds.emit(this.map.getCenter());
  }
}
