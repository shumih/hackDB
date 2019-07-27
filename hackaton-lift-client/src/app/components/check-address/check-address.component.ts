import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { AddressType } from '../main/main.component';

@Component({
  selector: 'app-check-address',
  templateUrl: './check-address.component.html',
  styleUrls: ['./check-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckAddressComponent implements OnInit {
  @Output() next: EventEmitter<AddressType> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onYes(): void {
    this.next.emit(AddressType.Padick);
  }

  onNo(): void {
    this.next.emit(AddressType.Address);
  }
}
