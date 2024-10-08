import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay, shareReplay, debounceTime } from 'rxjs/operators';

@Injectable()
export class LayoutService {

  protected layoutSize$ = new Subject<void>(); 
  protected layoutSizeChange$ = this.layoutSize$.pipe(
    shareReplay({ refCount: true }),
  );

  changeLayoutSize() {
    this.layoutSize$.next();
  }

  onChangeLayoutSize(): Observable<void> {
    return this.layoutSizeChange$.pipe(delay(1));
  }

  onSafeChangeLayoutSize(): Observable<void> {
    return this.layoutSizeChange$.pipe(
      debounceTime(350),
    );
  }
}
