import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CoreService } from '@core/services/core.service';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProblemComponent implements OnInit {
  public answer: string;
  public answers = ['Не работает лифт', 'В лифте грязно', 'В лифте нет света', 'Другое'];
  public selectedItem = null;

  constructor(public service: CoreService) {}

  ngOnInit() {}

  onSelected(num: number) {
    this.answer = this.answers[num];
    this.selectedItem = num;
  }

  onNext(comment): void {
    this.service.sendInfoAboutProblem({ comment, answer: this.answer });
    this.service.selectStep('surveyquestion');
  }
}
