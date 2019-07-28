import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SurveyService } from '@core/services/survey.service';
import { CoreService } from '@core/services/core.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyComponent {
  public surveyStep = 7;

  constructor(
    public surveyService: SurveyService,
    private coreService: CoreService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.surveyStep >= this.surveyService.survey.length) {
      this.coreService.addSurveyResult(this.surveyService.surveyForm.value);
    }

    this.setWithChangeDetection({ surveyStep: this.surveyStep + 1 });

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1500);
  }

  public setWithChangeDetection(data: Partial<SurveyComponent>): void {
    Object.assign(this, data);
    this.cdRef.detectChanges();
  }
}
