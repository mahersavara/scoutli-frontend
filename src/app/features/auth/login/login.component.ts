import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="auth-container">
      <h2>Login</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Email</label>
          <input type="email" [(ngModel)]="email" name="email" required>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" [(ngModel)]="password" name="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  `,
    styles: [`
    .auth-container { max-width: 400px; margin: 2rem auto; padding: 2rem; border: 1px solid #ddd; border-radius: 8px; }
    .form-group { margin-bottom: 1rem; }
    .form-group label { display: block; margin-bottom: 0.5rem; }
    .form-group input { width: 100%; padding: 0.5rem; }
    button { width: 100%; padding: 0.75rem; background: #333; color: white; border: none; cursor: pointer; }
  `]
})
export class LoginComponent {
    email = '';
    password = '';

    constructor(private authService: AuthService, private router: Router) { }

    onSubmit() {
        this.authService.login({ email: this.email, password: this.password }).subscribe({
            next: () => this.router.navigate(['/']),
            error: (err) => alert('Login failed')
        });
    }
}
