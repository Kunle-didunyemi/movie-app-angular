import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { mockMovies, Movie } from '../../shared/mock-movies';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule],
  template: `
    <section class="browse-container" aria-labelledby="browse-title">
      <h2 id="browse-title">Browse All</h2>

      <label for="search" class="visually-hidden">Search Movies</label>
      <input
        id="search"
        [(ngModel)]="searchTerm"
        placeholder="Search"
        class="search-input"
        aria-label="Search Movies"
      />

      <label for="genre" class="visually-hidden">Filter by Genre</label>
      <select
        id="genre"
        [(ngModel)]="selectedGenre"
        class="genre-filter"
        aria-label="Filter by Genre"
      >
        <option value="">All Genres</option>
        <option *ngFor="let genre of genres" [value]="genre">
          {{ genre }}
        </option>
      </select>

      <div *ngIf="loading" class="loading" role="status" aria-live="polite">
        Loading...
      </div>
      <div
        *ngIf="!loading && filteredMovies.length === 0"
        class="empty"
        role="alert"
      >
        No movies found.
      </div>

      <div
        *ngIf="!loading && filteredMovies.length > 0"
        class="grid"
        role="list"
      >
        <mat-card
          class="movie-card"
          *ngFor="let movie of filteredMovies"
          tabindex="0"
          role="listitem"
        >
          <img mat-card-image [src]="movie.image" [alt]="movie.title" />
          <mat-card-title>{{ movie.title }}</mat-card-title>
          <mat-card-subtitle
            >{{ movie.year }} | {{ movie.duration }} |
            {{ movie.rating }}</mat-card-subtitle
          >
          <p>{{ movie.genre }}</p>
        </mat-card>
      </div>
    </section>
  `,
  styles: [
    `
      .browse-container {
        padding: 1rem;
        background: #141414;
        color: #fff;
      }
      .search-input,
      .genre-filter {
        width: 100%;
        padding: 0.5rem;
        margin-bottom: 1rem;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 1rem;
      }
      .movie-card {
        background: #1f1f1f;
        color: #fff;
      }
      mat-card-title,
      mat-card-subtitle {
        margin-left: 0.5rem;
      }
      .loading,
      .empty {
        text-align: center;
        font-size: 1.2rem;
        margin-top: 2rem;
      }
      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }
    `,
  ],
})
export class BrowseComponent implements OnInit {
  searchTerm = '';
  selectedGenre = '';
  genres: string[] = [];
  loading = true;

  movies: Movie[] = mockMovies;

  get filteredMovies(): Movie[] {
    return this.movies.filter((movie) => {
      const matchesSearch =
        movie.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesGenre = this.selectedGenre
        ? movie.genre.includes(this.selectedGenre)
        : true;
      return matchesSearch && matchesGenre;
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      // Support multiple genres per movie
      this.genres = Array.from(
        new Set(
          this.movies.flatMap((m) => m.genre.split(',').map((g) => g.trim()))
        )
      );
      this.loading = false;
    }, 1000);
  }
}
