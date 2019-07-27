import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CoreService } from '@core/services/core.service';

@Component({
  selector: 'app-change-padick',
  templateUrl: './change-padick.component.html',
  styleUrls: ['./change-padick.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePadickComponent {
  public selectedItem: number;

  constructor(public service: CoreService) {}

  onSelected(num: number) {
    this.selectedItem = num;
  }

  onNext(): void {
    this.service.selectStep('problem');
  }
}
