import { Observable, Subject, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QrService {
  private scanEvent$: Subject<unknown> = new Subject();
  private camera: any;

  private get scanner(): any {
    return new (window as any).Instascan.Scanner({
      continuous: false,
      mirror: false,
    });
  }

  public scan(): Observable<unknown> {
    this.scanner.addListener('scan', (content, image) => {
      this.scanEvent$.next({ date: +Date.now(), content });
    });

    this.getCameras().then(cameras => {
      this.camera = cameras[0];

      if (!this.camera) {
        return throwError('Нет камеры');
      }

      this.scanner.start(this.camera);
    });

    return this.scanEvent$.asObservable();
  }

  private async getCameras(): Promise<any[]> {
    return (window as any).Instascan.Camera.getCameras();
  }
}
