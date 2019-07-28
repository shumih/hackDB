import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { CoreService } from '@core/services/core.service';

@Component({
  selector: 'app-check-address',
  templateUrl: './check-address.component.html',
  styleUrls: ['./check-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckAddressComponent {
  @Output() addressIsOk: EventEmitter<void> = new EventEmitter();
  constructor(public service: CoreService, private cdRef: ChangeDetectorRef) {}

  public isQRScanning = false;

  onYes(): void {
    this.addressIsOk.emit();
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
      this.service.addressInfo = info;
      this.service.sendAddressInfoInStorage();
      this.service.selectStep('problem');
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
