import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CoreService } from '@core/services/core.service';

@Component({
  selector: 'app-change-padick',
  templateUrl: './change-padick.component.html',
  styleUrls: ['./change-padick.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePadickComponent {
  public info = this.service.getAddressInfoFromStorage();
  public selectedItem: number = this.info && this.info.padick;

  constructor(public service: CoreService) {}

  onSelected(num: number) {
    this.selectedItem = num;
  }

  onNext(): void {
    if (!this.service.addressInfo.includes('подъезд')) {
      this.service.addressInfo += ` подъезд ${this.selectedItem}`;
    }
    this.service.sendAddressInfoInStorage();
    this.service.selectStep('problem');
  }
}
