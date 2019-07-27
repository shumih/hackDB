import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { QrService } from '@core/services/qr.service';
import { Step, CoreService } from '@core/services/core.service';

@Component({
  selector: 'app-check-address',
  templateUrl: './check-address.component.html',
  styleUrls: ['./check-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckAddressComponent implements OnInit {
  constructor(private qrService: QrService, public service: CoreService) {}

  ngOnInit() {}

  onYes(): void {
    this.service.selectStep('padick');
  }

  onNo(): void {
    this.service.selectStep('address');
  }

  scanQr(): void {
    // TODO filter wrong data
    this.qrService.scan().subscribe(event => {
      debugger;
    });
  }
}
