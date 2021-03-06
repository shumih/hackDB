import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SurveyService } from '@core/services/survey.service';
import { CoreService } from '@core/services/core.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyComponent {
  public surveyStep = 0;

  constructor(
    public surveyService: SurveyService,
    private coreService: CoreService,
    private cdRef: ChangeDetectorRef
  ) {}

  onSubmit(): void {
    this.setWithChangeDetection({ surveyStep: this.surveyStep + 1 });

    if (this.surveyService.survey.length <= this.surveyStep) {
      this.coreService.addSurveyResult(this.surveyService.surveyForm.value);

      setTimeout(() => {
        this.coreService.selectStep('question');
      }, 1500);
    }
  }

  public setWithChangeDetection(data: Partial<SurveyComponent>): void {
    Object.assign(this, data);
    this.cdRef.detectChanges();
  }
}
