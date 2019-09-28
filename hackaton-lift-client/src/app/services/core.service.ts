import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { forwardTo } from '@helpers';
import { shareReplay } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

export type Step = 'question' | 'padick' | 'address' | 'problem' | 'surveyquestion' | 'survey';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  public currentStep$: Observable<Step> = forwardTo(() => this.currentStepSubject).pipe(shareReplay(1));
  public addressInfo = '';
  public userId = this.getUserId();

  private currentStepSubject: Subject<Step> = new Subject();
  private problemCollection = this.store.collection('problems');
  private surveyResultCollection = this.store.collection('surveys');

  constructor(private http: HttpClient, private store: AngularFirestore) {}

  public selectStep(step: Step): void {
    this.currentStepSubject.next(step);
  }

  public sendAddressInfoInStorage(): void {
    localStorage.setItem('address', JSON.stringify(this.addressInfo));
  }

  public getAddressInfoFromStorage(): any {
    return JSON.parse(localStorage.getItem('address'));
  }

  public sendInfoAboutProblem(info: any): Promise<unknown> {
    return this.problemCollection.add(info);
  }

  public addSurveyResult(result: any) {
    const model = {
      address: this.addressInfo,
      user_id: this.userId,
      questions: result.map(item => item.answer),
    };

    this.surveyResultCollection.add(model);
  }

  private getUserId(): number {
    const fromStorage = localStorage.getItem('userid');

    if (fromStorage != null) {
      return +fromStorage;
    }

    const id = Math.round(10000000000000000 * Math.random());
    localStorage.setItem('userid', String(id));
  }
}
