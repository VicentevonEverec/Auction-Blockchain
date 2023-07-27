// scroll.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private sectionIdSource = new Subject<string>();

  setSectionId(id: string): void {
    this.sectionIdSource.next(id);
  }

  getSectionId(): Subject<string> {
    return this.sectionIdSource;
  }
}
