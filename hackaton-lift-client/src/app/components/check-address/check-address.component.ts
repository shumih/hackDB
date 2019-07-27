import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-check-address',
  templateUrl: './check-address.component.html',
  styleUrls: ['./check-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckAddressComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
