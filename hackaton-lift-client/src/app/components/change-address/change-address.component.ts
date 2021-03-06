import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CoreService } from '@core/services/core.service';

@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['./change-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeAddressComponent implements OnInit {
  public value = '';

  constructor(public service: CoreService) {}

  ngOnInit() {}

  public onFindGeo() {}

  onYes(): void {
    this.service.selectStep('padick');
  }
}
