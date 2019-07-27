import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { AddressType } from '../main/main.component';

@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['./change-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeAddressComponent implements OnInit {
  @Output() next: EventEmitter<AddressType> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onFindGeo() {

  }

  onYes(): void {
    this.next.emit(AddressType.Padick);
  }
}
