import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SurveyService } from '@core/services/survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyComponent {
  public surveyStep = 0;

  constructor(public surveyService: SurveyService, private cdRef: ChangeDetectorRef) {}

  onSubmit(): void {
    if (this.surveyService.survey.length !== this.surveyStep) {
      this.setWithChangeDetection({ surveyStep: this.surveyStep + 1 });
    }

    // TODO: send result
  }

  public setWithChangeDetection(data: Partial<SurveyComponent>): void {
    Object.assign(this, data);
    this.cdRef.detectChanges();
  }
}
