import { Component, Inject, ElementRef, Host } from '@angular/core';
import { Observable } from 'rxjs';
import { tag$ } from 'fire-slack/util/tags';


@Component({
  selector: 'conversation',
  template: `
    <h1>No channel selected</h1>
  `
})
export class NoConversationSelectedComponent {

  private height$: Observable<number>;

  constructor(
    @Inject(ElementRef) @Host() private elementRef: ElementRef
  ) {
    this.height$
      = Observable.merge(
          Observable.interval(200).take(10),
          Observable.fromEvent(window, 'resize')
        )
        .startWith(null)
        .mapTo(this.elementRef.nativeElement)
        .map(elem => elem.getBoundingClientRect())
        .map(({top}) => window.innerHeight - top);
  }
}
