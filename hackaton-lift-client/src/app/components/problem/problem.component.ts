import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CoreService } from '@core/services/core.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProblemComponent implements OnInit {
  public form = this.fb.group({});
  public selectedItem = 0;

  constructor(public service: CoreService, private fb: FormBuilder) {}

  ngOnInit() {}

  onSelected(num: number) {
    this.selectedItem = num;
  }

  onNext(): void {
    this.service.selectStep('surveyquestion')
    // this.service.sendInfoAboutProblem(this.form.value).subscribe(() => this.service.selectStep('surveyquestion'));
  }
}
