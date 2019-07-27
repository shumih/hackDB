import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { forwardTo } from '@helpers';
import { shareReplay } from 'rxjs/operators';

export type Step = 'question' | 'padick' | 'address' | 'problem' | 'surveyquestion' | 'survey';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  public currentStep$: Observable<Step> = forwardTo(() => this.currentStepSubject).pipe(shareReplay(1));

  public currentStepSubject: Subject<Step> = new Subject();

  constructor(private http: HttpClient) {}

  public selectStep(step: Step): void {
    this.currentStepSubject.next(step);
  }

  public setAddressInfoInStorage(info: {}): void {
    localStorage.address = JSON.stringify(info);
  }

  public getAddressInfoFromStorage(): {} | null {
    try {
      return JSON.parse(localStorage.address);
    } catch (e) {
      return null;
    }
  }

  public sendInfoAboutProblem(info: any): Observable<unknown> {
    return this.http.post('', info);
  }
}
