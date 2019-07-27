import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-change-padick',
  templateUrl: './change-padick.component.html',
  styleUrls: ['./change-padick.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePadickComponent implements OnInit {
  public selectedItem: number;

  constructor() { }

  ngOnInit() {
  }

  onSelected(num: number) {
    debugger
    this.selectedItem = num;
  }

}
