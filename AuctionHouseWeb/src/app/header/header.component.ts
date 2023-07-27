// header.component.ts
import { Component } from '@angular/core';
import { ScrollService } from '../home/scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private scrollService: ScrollService) {}

  scrollToSection(sectionId: string): void 
  {
    console.log("Tratando de acceder a la sección: " + sectionId);
    this.scrollService.setSectionId(sectionId);
  }
}
