import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarStateService {
  private expandedSubject = new BehaviorSubject<boolean>(false);
  isExpanded$ = this.expandedSubject.asObservable();

  setExpanded(expanded: boolean): void {
    this.expandedSubject.next(expanded);
  }

  constructor() { }
}
