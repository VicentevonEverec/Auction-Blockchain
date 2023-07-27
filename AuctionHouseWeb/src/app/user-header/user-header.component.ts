import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent {
  constructor(private router: Router) {}

  onLogin(): void {
    this.router.navigate(['/login']);
  }

  onRegister(): void {
    this.router.navigate(['/register']);
  }

  onHowToSell(): void {
    this.router.navigate(['/how-to-sell']);
  }
}
