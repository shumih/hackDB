import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['./change-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeAddressComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public onFindGeo() {

  }
}
