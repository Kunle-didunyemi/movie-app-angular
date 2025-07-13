import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar" [class.scrolled]="scrolled">
      <a routerLink="/" class="logo">NETFLIXIFY</a>
      <button
        class="hamburger"
        (click)="toggleMenu()"
        aria-label="Menu"
        *ngIf="isMobile && !menuOpen"
      >
        <svg width="32" height="32" viewBox="0 0 32 32">
          <rect y="7" width="32" height="3" rx="1.5" fill="#fff" />
          <rect y="15" width="32" height="3" rx="1.5" fill="#fff" />
          <rect y="23" width="32" height="3" rx="1.5" fill="#fff" />
        </svg>
      </button>
      <button
        class="close-btn"
        (click)="toggleMenu()"
        aria-label="Close menu"
        *ngIf="isMobile && menuOpen"
      >
        <svg width="32" height="32" viewBox="0 0 32 32">
          <line
            x1="8"
            y1="8"
            x2="24"
            y2="24"
            stroke="#fff"
            stroke-width="3"
            stroke-linecap="round"
          />
          <line
            x1="24"
            y1="8"
            x2="8"
            y2="24"
            stroke="#fff"
            stroke-width="3"
            stroke-linecap="round"
          />
        </svg>
      </button>
      <div class="nav-menu" [class.open]="menuOpen || !isMobile">
        <div class="nav-links">
          <a routerLink="/">Home</a>
          <a routerLink="/browse">TV Shows</a>
          <a routerLink="/browse">Movies</a>
          <a routerLink="/browse">New & Popular</a>
          <a routerLink="/browse">My List</a>
        </div>
        <div class="nav-icons">
          <button class="icon-btn" aria-label="Search">
            <svg width="22" height="22" viewBox="0 0 24 24">
              <circle
                cx="11"
                cy="11"
                r="8"
                stroke="#fff"
                stroke-width="2"
                fill="none"
              />
              <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
                stroke="#fff"
                stroke-width="2"
              />
            </svg>
          </button>
          <button class="icon-btn" aria-label="Notifications">
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path
                d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2zm6-6V11c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 0 0-3 0v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29A1 1 0 0 0 6 19h12a1 1 0 0 0 .71-1.71L18 16z"
                fill="#fff"
              />
            </svg>
          </button>
          <button class="icon-btn profile-btn" aria-label="User">
            <svg width="22" height="22" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" fill="#fff" />
              <path
                d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4"
                fill="none"
                stroke="#fff"
                stroke-width="2"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      .navbar {
        position: sticky;
        top: 0;
        width: 100%;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.7rem 2.5vw;
        background: linear-gradient(
          to bottom,
          rgba(20, 20, 20, 0.95) 80%,
          rgba(20, 20, 20, 0.5) 100%
        );
        color: #fff;
        transition: background 0.3s, box-shadow 0.3s;
      }
      .navbar.scrolled {
        background: #141414;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
      }
      .logo {
        font-size: 2rem;
        font-weight: bold;
        color: #e50914;
        text-decoration: none;
        letter-spacing: 1px;
        margin-right: 2.5rem;
      }
      .hamburger {
        display: none;
        background: none;
        border: none;
        margin-left: auto;
        cursor: pointer;
        z-index: 200;
      }
      .close-btn {
        display: none;
        background: none;
        border: none;
        margin-left: auto;
        cursor: pointer;
        z-index: 201;
        position: fixed;
        top: 1.2rem;
        right: 1.2rem;
      }
      .nav-menu {
        display: flex;
        align-items: center;
        transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .nav-links {
        display: flex;
        gap: 1.2rem;
      }
      .nav-links a {
        color: #fff;
        text-decoration: none;
        font-size: 1.08rem;
        font-weight: 500;
        opacity: 0.85;
        transition: opacity 0.2s;
      }
      .nav-links a:hover {
        opacity: 1;
      }
      .nav-icons {
        display: flex;
        align-items: center;
        gap: 0.7rem;
      }
      .icon-btn {
        background: none;
        border: none;
        padding: 0.3em;
        cursor: pointer;
        display: flex;
        align-items: center;
        border-radius: 50%;
        transition: background 0.2s;
      }
      .icon-btn:hover {
        background: rgba(255, 255, 255, 0.08);
      }
      .profile-btn {
        margin-left: 0.2rem;
      }
      @media (max-width: 900px) {
        .nav-links {
          gap: 0.7rem;
        }
        .logo {
          font-size: 1.3rem;
        }
      }
      @media (max-width: 700px) {
        .hamburger {
          display: block;
        }
        .nav-menu {
          position: fixed;
          top: 0;
          right: -100vw;
          width: 70vw;
          max-width: 340px;
          height: 100vh;
          background: #111;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          padding: 4.5rem 1.5rem 1.5rem 1.5rem;
          box-shadow: -2px 0 16px rgba(0, 0, 0, 0.25);
          z-index: 150;
          transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-menu.open {
          right: 0;
        }
        .nav-links {
          flex-direction: column;
          gap: 1.2rem;
          width: 100%;
        }
        .nav-icons {
          margin-top: 2rem;
          width: 100%;
          justify-content: flex-start;
        }
        .close-btn {
          display: block;
        }
      }
      @media (max-width: 500px) {
        .nav-links {
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .logo {
          font-size: 1.1rem;
        }
        .nav-menu {
          width: 100vw;
          max-width: 100vw;
          padding: 4.5rem 1rem 1rem 1rem;
        }
      }
    `,
  ],
})
export class NavbarComponent {
  scrolled = false;
  isMobile = false;
  menuOpen = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 30;
  }

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 700;
    if (!this.isMobile) this.menuOpen = false;
  }

  ngOnInit() {
    this.isMobile = window.innerWidth < 700;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
