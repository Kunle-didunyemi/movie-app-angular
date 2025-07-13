import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { mockMovies, Movie } from '../../shared/mock-movies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div *ngIf="movie" class="details-container">
      <button class="back-btn" (click)="goBack()">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <polyline
            points="15 18 9 12 15 6"
            stroke="#fff"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Back
      </button>
      <mat-card>
        <div
          class="img-wrapper"
          (mouseenter)="hovered = true"
          (mouseleave)="hovered = false"
        >
          <img mat-card-image [src]="movie.image" [alt]="movie.title" />
          <button
            *ngIf="hovered"
            class="play-overlay"
            (click)="playMovie($event)"
          >
            <svg width="56" height="56" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="28" fill="#e50914" />
              <polygon points="24,18 40,28 24,38" fill="#fff" />
            </svg>
          </button>
        </div>
        <mat-card-title>{{ movie.title }}</mat-card-title>
        <mat-card-subtitle
          >{{ movie.year }}, {{ movie.duration }},
          {{ movie.rating }}</mat-card-subtitle
        >
        <mat-card-content>
          <div class="genre-chips">
            <span class="chip" *ngFor="let g of genres">{{ g }}</span>
          </div>
          <p>{{ movie.description }}</p>
        </mat-card-content>
      </mat-card>
      <div *ngIf="relatedMovies.length" class="related-section">
        <h3>You may also like</h3>
        <div class="related-row">
          <div
            class="related-card"
            *ngFor="let m of relatedMovies"
            (click)="goToDetails(m.id)"
          >
            <img [src]="m.image" [alt]="m.title" />
            <div class="related-title">{{ m.title }}</div>
          </div>
        </div>
      </div>
      <div *ngIf="toast" class="toast">Playing {{ movie.title }}</div>
    </div>
  `,
  styles: [
    `
      .details-container {
        padding: 2rem;
        background: #141414;
        color: #fff;
        max-width: 700px;
        margin: 0 auto;
      }
      .back-btn {
        display: flex;
        align-items: center;
        gap: 0.5em;
        background: none;
        border: none;
        color: #fff;
        font-size: 1.1rem;
        font-weight: 500;
        margin-bottom: 1.2rem;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.2s;
      }
      .back-btn:hover {
        opacity: 1;
      }
      mat-card {
        background-color: #1f1f1f;
        color: #fff;
      }
      .img-wrapper {
        position: relative;
        width: 100%;
        max-width: 480px;
        margin: 0 auto 1.5rem auto;
        display: block;
      }
      .img-wrapper img {
        width: 100%;
        border-radius: 8px;
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
      .genre-chips {
        margin-bottom: 1rem;
      }
      .chip {
        display: inline-block;
        background: #333;
        color: #fff;
        border-radius: 1em;
        padding: 0.2em 1em;
        font-size: 0.95em;
        margin-right: 0.5em;
        margin-bottom: 0.3em;
      }
      .related-section {
        margin-top: 2.5rem;
      }
      .related-section h3 {
        font-size: 1.2rem;
        margin-bottom: 1rem;
        color: #fff;
      }
      .related-row {
        display: flex;
        gap: 1rem;
        overflow-x: auto;
        padding-bottom: 0.5rem;
      }
      .related-card {
        min-width: 120px;
        background: #222;
        border-radius: 6px;
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.18s;
        flex-shrink: 0;
        text-align: center;
      }
      .related-card:hover {
        transform: scale(1.07);
      }
      .related-card img {
        width: 100%;
        height: 70px;
        object-fit: cover;
        border-bottom: 1px solid #333;
      }
      .related-title {
        font-size: 0.95rem;
        color: #fff;
        padding: 0.5em 0.2em 0.7em 0.2em;
      }
      .toast {
        position: fixed;
        bottom: 2.5rem;
        left: 50%;
        transform: translateX(-50%);
        background: #e50914;
        color: #fff;
        padding: 1em 2em;
        border-radius: 0.5em;
        font-size: 1.1rem;
        font-weight: 600;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: fadein 0.3s, fadeout 0.3s 1.7s;
      }
      @keyframes fadein {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      @keyframes fadeout {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
      @media (max-width: 700px) {
        .details-container {
          padding: 1rem 0.5rem;
        }
        .img-wrapper {
          max-width: 100%;
        }
        .related-row {
          gap: 0.5rem;
        }
        .related-card {
          min-width: 90px;
        }
        .related-card img {
          height: 45px;
        }
      }
    `,
  ],
})
export class DetailsComponent implements OnInit {
  movie: Movie | undefined;
  hovered = false;
  toast = false;
  relatedMovies: Movie[] = [];
  genres: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.movie = mockMovies.find((m) => m.id === id);
    this.relatedMovies = mockMovies.filter((m) => m.id !== id).slice(0, 5);
    this.genres = this.movie?.genre
      ? this.movie.genre.split(',').map((s) => s.trim())
      : [];
  }

  playMovie(event: Event) {
    event.stopPropagation();
    this.toast = true;
    setTimeout(() => (this.toast = false), 2000);
  }

  goBack() {
    this.router.navigate(['/browse']);
  }

  goToDetails(id: string) {
    this.router.navigate(['/details', id]);
  }
}
