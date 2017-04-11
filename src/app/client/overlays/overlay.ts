import { Observable } from 'rxjs';


export abstract class Overlay {
  confirm?: () => Observable<any>;
  open?: () => Observable<any>;
}
