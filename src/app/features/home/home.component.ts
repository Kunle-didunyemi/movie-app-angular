import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieRowComponent } from '../../shared/components/movie-row.component';
import {
  trendingNow,
  newReleases,
  actionMovies,
  dramaMovies,
  sciFiMovies,
  thrillerMovies,
  topRated,
  mockMovies,
} from '../../shared/mock-movies';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieRowComponent],
  template: `
    <section class="hero">
      <div class="hero-content">
        <div class="hero-badge">NEW RELEASE</div>
        <h1 class="title">{{ featured.title }}</h1>
        <p class="subtitle">{{ featured.description }}</p>
        <div class="hero-meta">
          <span>{{ featured.year }}</span>
          <span class="dot">•</span>
          <span>{{ featured.duration }}</span>
          <span class="dot">•</span>
          <span>{{ featured.rating }}</span>
          <span class="dot">•</span>
          <span>{{ featured.genre }}</span>
        </div>
        <div class="hero-actions">
          <button class="play-btn">▶ Play</button>
          <button class="info-btn">More Info</button>
        </div>
      </div>
      <div
        class="hero-bg"
        [style.backgroundImage]="'url(' + featured.image + ')'"
      ></div>
    </section>
    <main class="movie-rows">
      <app-movie-row
        title="Trending Now"
        [movies]="trendingNow"
      ></app-movie-row>
      <app-movie-row
        title="New Releases"
        [movies]="newReleases"
      ></app-movie-row>
      <app-movie-row
        title="Action & Adventure"
        [movies]="actionMovies"
      ></app-movie-row>
      <app-movie-row title="Drama" [movies]="dramaMovies"></app-movie-row>
      <app-movie-row title="Sci-Fi" [movies]="sciFiMovies"></app-movie-row>
      <app-movie-row title="Thriller" [movies]="thrillerMovies"></app-movie-row>
      <app-movie-row title="Top Rated" [movies]="topRated"></app-movie-row>
    </main>
  `,
  styles: [
    `
      .hero {
        position: relative;
        height: 70vh;
        display: flex;
        align-items: flex-end;
        color: #fff;
        overflow: hidden;
        margin-bottom: 2.5rem;
      }
      .hero-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-size: cover;
        background-position: center;
        filter: brightness(0.5) blur(2px);
        z-index: 1;
      }
      .hero-content {
        position: relative;
        z-index: 2;
        padding: 3rem 2rem 4rem 3rem;
        max-width: 700px;
      }
      .hero-badge {
        display: inline-block;
        background: #e50914;
        color: #fff;
        font-size: 0.95rem;
        font-weight: 600;
        padding: 0.2em 0.8em;
        border-radius: 0.5em;
        margin-bottom: 1.2rem;
      }
      .title {
        font-size: 3rem;
        font-weight: bold;
        margin-bottom: 1rem;
      }
      .subtitle {
        font-size: 1.3rem;
        margin-bottom: 1.2rem;
        color: #eee;
      }
      .hero-meta {
        font-size: 1.1rem;
        color: #bbb;
        margin-bottom: 1.5rem;
      }
      .dot {
        margin: 0 0.5em;
      }
      .hero-actions {
        display: flex;
        gap: 1rem;
      }
      .play-btn,
      .info-btn {
        font-size: 1.1rem;
        font-weight: 600;
        padding: 0.7em 2em;
        border: none;
        border-radius: 0.3em;
        cursor: pointer;
        transition: background 0.2s;
      }
      .play-btn {
        background: #fff;
        color: #111;
      }
      .play-btn:hover {
        background: #e6e6e6;
      }
      .info-btn {
        background: rgba(109, 109, 110, 0.7);
        color: #fff;
      }
      .info-btn:hover {
        background: rgba(109, 109, 110, 0.9);
      }
      .movie-rows {
        margin-top: 1.5rem;
      }
      @media (max-width: 700px) {
        .hero-content {
          padding: 1.5rem 1rem 2rem 1rem;
        }
        .title {
          font-size: 2rem;
        }
        .hero-meta {
          font-size: 0.95rem;
        }
        .hero-actions {
          flex-direction: column;
          gap: 0.7rem;
        }
        .play-btn,
        .info-btn {
          width: 100%;
          padding: 0.7em 0;
        }
      }
      @media (max-width: 500px) {
        .hero {
          height: 45vh;
        }
        .hero-content {
          padding: 1rem 0.5rem 1.5rem 0.5rem;
        }
        .title {
          font-size: 1.2rem;
        }
        .subtitle {
          font-size: 1rem;
        }
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  featured = mockMovies[0];
  trendingNow = trendingNow;
  newReleases = newReleases;
  actionMovies = actionMovies;
  dramaMovies = dramaMovies;
  sciFiMovies = sciFiMovies;
  thrillerMovies = thrillerMovies;
  topRated = topRated;

  constructor() {}
  ngOnInit(): void {}
}
