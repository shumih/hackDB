import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CoreService } from '@core/services/core.service';

@Component({
  selector: 'app-survey-ask',
  templateUrl: './survey-ask.component.html',
  styleUrls: ['./survey-ask.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyAskComponent implements OnInit {
  constructor(public service: CoreService) {}

  ngOnInit() {}

  onYes(): void {
    this.service.selectStep('survey');
  }

  onNo(): void {
    this.service.selectStep('address');
  }
}
