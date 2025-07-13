import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-form">
      <h2>Sign Up</h2>
      <form (ngSubmit)="onSignup()">
        <input [(ngModel)]="email" name="email" placeholder="Email" required />
        <input
          [(ngModel)]="password"
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
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
export class SignupComponent {
  email = '';
  password = '';

  onSignup(): void {
    alert('Signup successful!');
  }
}
