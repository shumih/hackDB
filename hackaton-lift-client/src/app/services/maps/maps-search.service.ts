import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MapsGeo } from '@core/models/maps/maps-geo.type';
import { RxFn } from 'rxfn';

@Injectable()
export class MapsSearchService {
  private readonly URL = 'http://cc-remote.dc.wildberries.ru/geocoding/geocode';

  public search = new RxFn<MapsGeo, [string, number?]>(this._search);

  constructor(
    private _http: HttpClient
  ) {}

  private _search(value: string, skip = 0): Observable<MapsGeo> {
    return this._http.get<MapsGeo>(`${this.URL}/${value}/json/${skip}`);
  }
}
