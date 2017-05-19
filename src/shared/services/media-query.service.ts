import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, ConnectableObservable, Observable } from 'rxjs';


@Injectable()
export class MediaQueryService {
  windowWidth$: Observable<number>;

  xsUp$: Observable<boolean>;
  smUp$: Observable<boolean>;
  mdUp$: Observable<boolean>;
  lgUp$: Observable<boolean>;
  xlUp$: Observable<boolean>;

  xs$: Observable<boolean>;
  sm$: Observable<boolean>;
  md$: Observable<boolean>;
  lg$: Observable<boolean>;
  xl$: Observable<boolean>;

  xsDown$: Observable<boolean>;
  smDown$: Observable<boolean>;
  mdDown$: Observable<boolean>;
  lgDown$: Observable<boolean>;
  xlDown$: Observable<boolean>;

  constructor() {

    this.windowWidth$
      = Observable.fromEvent(window, 'resize')
          .map(_ => window.innerWidth)
          .startWith(window.innerWidth)
          .distinctUntilChanged()
          // .publishReplay(1);

    this.xsUp$ = this.windowWidth$.map(width => width > 0);
    this.smUp$ = this.windowWidth$.map(width => width > 576);
    this.mdUp$ = this.windowWidth$.map(width => width > 768);
    this.lgUp$ = this.windowWidth$.map(width => width > 992);
    this.xlUp$ = this.windowWidth$.map(width => width > 1200);

    this.xsDown$ = this.windowWidth$.map(width => width < 576);
    this.smDown$ = this.windowWidth$.map(width => width < 768);
    this.mdDown$ = this.windowWidth$.map(width => width < 992);
    this.lgDown$ = this.windowWidth$.map(width => width < 1200);
    this.xlDown$ = this.windowWidth$.map(width => true);

    this.xs$ = Observable.combineLatest(this.xsUp$, this.xsDown$, (up, down) => up && down);
    this.sm$ = Observable.combineLatest(this.smUp$, this.smDown$, (up, down) => up && down);
    this.md$ = Observable.combineLatest(this.mdUp$, this.mdDown$, (up, down) => up && down);
    this.lg$ = Observable.combineLatest(this.lgUp$, this.lgDown$, (up, down) => up && down);
    this.xl$ = Observable.combineLatest(this.xlUp$, this.xlDown$, (up, down) => up && down);
  }
}
