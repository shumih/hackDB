import { EMPTY, Observable, of, Subject } from 'rxjs';
import { catchError, share, switchMap, switchMapTo, tap } from 'rxjs/operators';

export function forwardTo<T>(fn: () => Observable<T>): Observable<T> {
  return of(null).pipe(switchMap(fn));
}

export function triggerAndSwitchTo<T>(value$: Observable<T>, subject: Subject<T>): Observable<T> {
  const observable$ = value$.pipe(
    catchError(error => {
      subject.error(error);

      return EMPTY;
    }),
    tap(value => setTimeout(() => subject.next(value))),
    switchMapTo(subject),
    share()
  );

  observable$.subscribe();

  return observable$;
}
