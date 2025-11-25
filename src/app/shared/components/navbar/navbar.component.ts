import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    template: `
    <nav class="navbar">
      <div class="container">
        <a routerLink="/" class="logo">Scoutli</a>
        <div class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
          <ng-container *ngIf="authService.user$ | async as user; else guest">
            <span class="user-email">{{ user.sub || user.upn }}</span>
            <button (click)="logout()">Logout</button>
          </ng-container>
          <ng-template #guest>
            <a routerLink="/login" routerLinkActive="active">Login</a>
            <a routerLink="/register" routerLinkActive="active">Register</a>
          </ng-template>
        </div>
      </div>
    </nav>
  `,
    styles: [`
    .navbar { background: #333; color: white; padding: 1rem; }
    .container { display: flex; justify-content: space-between; align-items: center; }
    .logo { font-weight: bold; font-size: 1.5rem; color: white; text-decoration: none; }
    .nav-links a { color: #ddd; text-decoration: none; margin-left: 1rem; }
    .nav-links a.active { color: white; font-weight: bold; }
    .nav-links button { margin-left: 1rem; background: none; border: 1px solid #ddd; color: white; padding: 0.5rem 1rem; cursor: pointer; }
    .user-email { margin-left: 1rem; color: #aaa; }
  `]
})
export class NavbarComponent {
    constructor(public authService: AuthService) { }

    logout() {
        this.authService.logout();
    }
}
