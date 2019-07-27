import { Component, OnInit, ViewChild, ElementRef, Renderer2, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, filter, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MapsSearchService } from '@core/services/maps/maps-search.service';
import { MapsComponent } from '../maps.component';
import { MapsGeoData } from '@core/models/maps/maps-geo-data.type';
import { MapsGeo } from '@core/models/maps/maps-geo.type';
import { ObjectHelper } from '@core/helpers/object-helper.extensions';
declare var ymaps: any;

@Component({
  selector: 'app-maps-search',
  templateUrl: './maps-search.component.html',
  styleUrls: ['./maps-search.component.scss'],
  providers: [MapsSearchService]
})
export class MapsSearchComponent implements OnInit, OnDestroy {
  private readonly SKIP_STEP = 10;
  private readonly HOUSE_LEVEL_ZOOM = 16;
  private readonly DEBOUNCE_TIME_SEARCH = 500;
  private readonly DEBOUNCE_TIME_MORE = 100;
  private readonly PLACEMARK_COLOR = 'islands#dotIcon';

  @ViewChild('searchMore', { static: false }) searchMore: ElementRef;

  @Output() selectedItem: EventEmitter<any> = new EventEmitter();
  @Input() onInitMap: Subject<MapsComponent>;

  public map: any;
  public searchValue: string;
  public searchHandler$: Subject<string> = new Subject();
  public moreHandler$: Subject<number> = new Subject();
  public result: any[];
  public current: any;
  public found: number;
  public skip = 0;
  public placeMark: any;
  public openPanel = false;

  public moreLoader$: BehaviorSubject<any>;
  public searchLoader$: BehaviorSubject<any>;

  public get isMore(): boolean {
    return this.result && this.result.length < this.found;
  }

  constructor(
    public renderer: Renderer2,
    public service: MapsSearchService,
  ) { }

  ngOnInit() {
    this.onInitMap.pipe(
      ObjectHelper.untilDestroyed(this)
    ).subscribe((component) => {
      this.map = component.map;
      this.map.events.add('dblclick', this.onDoubleClick.bind(this));
      this.map.events.add('click', this._closeSearchPanel.bind(this));
    });

    this.searchHandler$.pipe(
      ObjectHelper.untilDestroyed(this),
      debounceTime(this.DEBOUNCE_TIME_SEARCH),
      filter((value) => {
        if (value === '') {
          this.onClearSearch();
          return false;
        }
        if (value !== this.searchValue) {
          return false;
        }
        return Boolean(value);
      }),
      switchMap((value) => {
        this.searchLoader$ = this.service.search.isLoading$;
        return this.service.search(value);
      })
    ).subscribe(this._applySearch.bind(this));

    this.moreHandler$.pipe(
      ObjectHelper.untilDestroyed(this),
      distinctUntilChanged(),
      debounceTime(this.DEBOUNCE_TIME_MORE)
    ).subscribe(this.onClickMore.bind(this));
  }

  ngOnDestroy() {}

  public onChangeSearch(value: string): void {
    this.searchHandler$.next(value);
  }

  public onClearSearch(): void {
    this.result = null;
    this.current = null;
    this.found = null;
    this.skip = 0;
  }

  public onClickButton(): void {
    this.openPanel = !this.openPanel;
  }

  public onClickMore(): void {
    this.skip += this.SKIP_STEP;
    this.moreLoader$ = this.service.search.isLoading$;
    this.service.search(this.searchValue, this.skip).subscribe((result) => {
      this.result = this.result.concat(result.data);
    });
  }

  public onScroll(e): void {
    if (
      this.isMore &&
      e.currentTarget.offsetHeight + e.currentTarget.scrollTop >
      e.currentTarget.scrollHeight - (this.searchMore.nativeElement.offsetHeight / 2)
    ) {
      this.moreHandler$.next(this.skip);
    }
  }

  public onDoubleClick(e): void {
    e.preventDefault();

    const coords = e.get('coords');
    this._changePlaceMarkCoords(coords[0], coords[1], false);
  }

  public getPlaceMarkCoords(): any {
      if (this.placeMark == null) {
        return { isNull: true };
      }

      const coords = this.placeMark.geometry.getCoordinates();
      return { isNull: false, latitude: coords[0], longitude: coords[1] };
  }

  public onSelectItem(item: MapsGeoData): void {
    if (this.current) {
      this.current.selected = false;
    }
    item.selected = true;
    this.current = item;
    this._closeSearchPanel();
    this._changePlaceMarkCoords(item.coordinates[1], item.coordinates[0], true);
  }

  private _changePlaceMarkCoords(latitude: number, longitude: number, isNeedChangeZoom: boolean): void {
    if (this.placeMark) {
      this.map.geoObjects.remove(this.placeMark);
    }

    if (isNeedChangeZoom) {
      this.map.setCenter([latitude, longitude], this.HOUSE_LEVEL_ZOOM);
    }

    this.placeMark = new ymaps.Placemark([latitude, longitude], {}, { draggable: true, preset: this.PLACEMARK_COLOR });
    this.map.geoObjects.add(this.placeMark);
  }

  private _closeSearchPanel(): void {
    if (this.openPanel) {
      this.openPanel = false;
    }
  }

  private _applySearch(result: MapsGeo): void {
    this.result = result.data;
    this.found = result.found;
    this.skip = 0;
  }
}
