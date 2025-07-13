import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../mock-movies';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-movie-row',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section
      class="movie-row"
      (mouseenter)="showArrows = true"
      (mouseleave)="showArrows = false"
    >
      <h2 class="row-title">{{ title }}</h2>
      <div class="row-scroll-wrapper">
        <button
          class="arrow left"
          *ngIf="showArrows || isMobile"
          (click)="scroll('left')"
          aria-label="Scroll left"
        >
          <svg width="28" height="28" viewBox="0 0 24 24">
            <polyline
              points="15 18 9 12 15 6"
              stroke="#fff"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <div class="row-scroll" #scrollContainer>
          <div
            class="movie-card fade-in"
            *ngFor="let movie of movies"
            (mouseenter)="hovered = movie.id"
            (mouseleave)="hovered = null"
            (click)="goToDetails(movie.id)"
          >
            <div class="img-wrapper">
              <img
                [src]="movie.image"
                [alt]="movie.title"
                class="movie-img"
                loading="lazy"
              />
              <button
                *ngIf="hovered === movie.id"
                class="play-overlay"
                (click)="goToDetails(movie.id); $event.stopPropagation()"
              >
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.7)" />
                  <polygon points="20,16 36,24 20,32" fill="#fff" />
                </svg>
              </button>
            </div>
            <div class="movie-info">
              <div class="movie-title">{{ movie.title }}</div>
              <div class="movie-meta">
                <span>{{ movie.year }}</span>
                <span class="dot">•</span>
                <span>{{ movie.rating }}</span>
              </div>
            </div>
          </div>
        </div>
        <button
          class="arrow right"
          *ngIf="showArrows || isMobile"
          (click)="scroll('right')"
          aria-label="Scroll right"
        >
          <svg width="28" height="28" viewBox="0 0 24 24">
            <polyline
              points="9 6 15 12 9 18"
              stroke="#fff"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  `,
  styles: [
    `
      .movie-row {
        margin-bottom: 2.5rem;
      }
      .row-title {
        color: #fff;
        font-size: 1.4rem;
        font-weight: 600;
        margin: 0 0 1rem 1.5rem;
      }
      .row-scroll-wrapper {
        display: flex;
        align-items: center;
        position: relative;
      }
      .row-scroll {
        display: flex;
        overflow-x: auto;
        padding-left: 1.5rem;
        gap: 1.2rem;
        scrollbar-width: thin;
        scrollbar-color: #333 #141414;
        scroll-behavior: smooth;
        flex: 1 1 auto;
        scroll-snap-type: x mandatory;
      }
      .row-scroll::-webkit-scrollbar {
        height: 8px;
        background: #141414;
      }
      .row-scroll::-webkit-scrollbar-thumb {
        background: #333;
        border-radius: 4px;
      }
      .movie-card {
        min-width: 220px;
        background: #222;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s;
        cursor: pointer;
        flex-shrink: 0;
        position: relative;
        scroll-snap-align: start;
        opacity: 0;
        animation: fadeIn 0.7s forwards;
      }
      .fade-in {
        opacity: 0;
        animation: fadeIn 0.7s forwards;
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }
      .movie-card:hover {
        transform: scale(1.06);
        z-index: 2;
      }
      .img-wrapper {
        position: relative;
        width: 100%;
        height: 125px;
      }
      .movie-img {
        width: 100%;
        height: 125px;
        object-fit: cover;
        display: block;
      }
      .play-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
        z-index: 3;
        padding: 0;
      }
      .play-overlay svg {
        display: block;
      }
      .movie-info {
        padding: 0.7rem 1rem 1rem 1rem;
        color: #fff;
      }
      .movie-title {
        font-size: 1.1rem;
        font-weight: 500;
        margin-bottom: 0.3rem;
      }
      .movie-meta {
        font-size: 0.95rem;
        color: #bbb;
      }
      .dot {
        margin: 0 0.4em;
      }
      .arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(20, 20, 20, 0.7);
        border: none;
        border-radius: 50%;
        width: 38px;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        cursor: pointer;
        z-index: 10;
        opacity: 0.85;
        transition: background 0.2s, opacity 0.2s;
      }
      .arrow.left {
        left: 0.2rem;
      }
      .arrow.right {
        right: 0.2rem;
      }
      .arrow:hover {
        background: #e50914;
        opacity: 1;
      }
      @media (max-width: 700px) {
        .movie-card {
          min-width: 140px;
        }
        .movie-title {
          font-size: 0.95rem;
        }
        .movie-meta {
          font-size: 0.8rem;
        }
        .row-title {
          font-size: 1.1rem;
          margin-left: 0.5rem;
        }
        .row-scroll {
          gap: 0.5rem;
          padding-left: 0.5rem;
        }
        .arrow {
          width: 32px;
          height: 32px;
        }
      }
      @media (max-width: 500px) {
        .movie-card {
          min-width: 110px;
        }
        .movie-img {
          height: 70px;
        }
        .movie-info {
          padding: 0.4rem 0.5rem 0.7rem 0.5rem;
        }
      }
    `,
  ],
})
export class MovieRowComponent implements AfterViewInit {
  @Input() title = '';
  @Input() movies: Movie[] = [];
  hovered: string | null = null;
  showArrows = false;
  isMobile = false;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.isMobile = window.innerWidth < 700;
  }

  goToDetails(id: string) {
    this.router.navigate(['/details', id]);
  }

  scroll(direction: 'left' | 'right') {
    const el = this.scrollContainer.nativeElement;
    const scrollAmount = el.offsetWidth * 0.7;
    if (direction === 'left') {
      el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
}
