import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { forwardTo } from '@helpers';
import { shareReplay } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { fromPromise } from 'rxjs/internal-compatibility';

export type Step = 'question' | 'padick' | 'address' | 'problem' | 'surveyquestion' | 'survey';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  public currentStep$: Observable<Step> = forwardTo(() => this.currentStepSubject).pipe(shareReplay(1));
  public addressInfo: any = {};

  private currentStepSubject: Subject<Step> = new Subject();
  private problemCollection = this.store.collection('problems');

  constructor(private http: HttpClient, private store: AngularFirestore) {}

  public selectStep(step: Step): void {
    this.currentStepSubject.next(step);
  }

  public sendAddressInfoInStorage(): void {
    localStorage.setItem('address', JSON.stringify(this.addressInfo));
  }

  public getAddressInfoFromStorage(): Observable<unknown> {
    return JSON.parse(localStorage.getItem('address'));
  }

  public sendInfoAboutProblem(info: any): Observable<unknown> {
    return fromPromise(this.problemCollection.add(info));
  }
}
