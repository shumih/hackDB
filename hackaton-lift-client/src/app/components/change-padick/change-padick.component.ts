import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { AddressType } from '../main/main.component';

@Component({
  selector: 'app-change-padick',
  templateUrl: './change-padick.component.html',
  styleUrls: ['./change-padick.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePadickComponent implements OnInit {
  @Output() next: EventEmitter<AddressType> = new EventEmitter();

  public selectedItem: number;

  constructor() { }

  ngOnInit() {
  }

  onSelected(num: number) {
    this.selectedItem = num;
  }

  onNext(): void {

  }
}
