import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-form">
      <h2>Login</h2>
      <form (ngSubmit)="onLogin()">
        <input [(ngModel)]="email" name="email" placeholder="Email" required />
        <input
          [(ngModel)]="password"
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  `,
  styles: [
    `
      .auth-form {
        max-width: 400px;
        margin: 3rem auto;
        padding: 2rem;
        background: #1f1f1f;
        color: #fff;
        border-radius: 8px;
      }
      input,
      button {
        display: block;
        width: 100%;
        margin-top: 1rem;
        padding: 0.5rem;
        font-size: 1rem;
      }
    `,
  ],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  onLogin(): void {
    if (this.email === 'test@example.com' && this.password === 'password') {
      alert('Login successful');
      this.router.navigate(['/']);
    } else {
      alert('Invalid credentials');
    }
  }
}
