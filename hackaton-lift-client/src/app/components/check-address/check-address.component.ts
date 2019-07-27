import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CoreService } from '@core/services/core.service';

@Component({
  selector: 'app-check-address',
  templateUrl: './check-address.component.html',
  styleUrls: ['./check-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckAddressComponent {
  constructor(public service: CoreService, private cdRef: ChangeDetectorRef) {}

  public isQRScanning = false;

  onYes(): void {
    this.service.selectStep('padick');
  }

  onNo(): void {
    this.service.selectStep('address');
  }

  handleScanEvent(data: string): void {
    try {
      const info = JSON.parse(data);

      if (this.isWrongData(info)) {
        return;
      }

      this.setWithChangeDetection({ isQRScanning: false });
      this.service.setAddressInfoInStorage(info);
      this.service.selectStep('padick');
    } catch (e) {
      console.log('parse error');
    }
  }

  handleScan(): void {
    this.setWithChangeDetection({ isQRScanning: !this.isQRScanning });
  }

  public setWithChangeDetection(data: Partial<CheckAddressComponent>): void {
    Object.assign(this, data);
    this.cdRef.detectChanges();
  }

  private isWrongData(data: any): boolean {
    return true;
  }
}
