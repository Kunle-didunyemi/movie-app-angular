export interface Movie {
  id: string;
  title: string;
  image: string;
  year: number;
  duration: string;
  rating: string;
  genre: string;
  description: string;
}

// Mock movie data - in a real app, this would come from an API
export const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Stranger Things',
    image:
      'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=225&fit=crop',
    year: 2023,
    duration: '45m',
    rating: 'TV-14',
    genre: 'Sci-Fi, Drama, Horror',
    description:
      'A group of kids in a small town uncover supernatural mysteries and government conspiracies.',
  },
  {
    id: '2',
    title: 'The Crown',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop',
    year: 2023,
    duration: '1h',
    rating: 'TV-MA',
    genre: 'Drama, History',
    description:
      "The political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.",
  },
  {
    id: '3',
    title: 'Dark',
    image:
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=225&fit=crop',
    year: 2023,
    duration: '1h',
    rating: 'TV-MA',
    genre: 'Sci-Fi, Mystery, Drama',
    description:
      'A family saga with a supernatural twist, set in a German town where the disappearance of children exposes relationships among four families.',
  },
  {
    id: '4',
    title: 'Money Heist',
    image:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=225&fit=crop',
    year: 2023,
    duration: '1h 10m',
    rating: 'TV-MA',
    genre: 'Crime, Drama, Thriller',
    description:
      'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.',
  },
  {
    id: '5',
    title: 'Wednesday',
    image:
      'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=225&fit=crop',
    year: 2023,
    duration: '50m',
    rating: 'TV-14',
    genre: 'Comedy, Horror, Mystery',
    description:
      'Wednesday Addams attempts to master her emerging psychic ability, thwart a monstrous killing spree that has terrorized the local town.',
  },
  {
    id: '6',
    title: 'Ozark',
    image:
      'https://images.unsplash.com/photo-1489599577810-1bd15ace0e65?w=400&h=225&fit=crop',
    year: 2022,
    duration: '1h',
    rating: 'TV-MA',
    genre: 'Crime, Drama, Thriller',
    description:
      'A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.',
  },
  {
    id: '7',
    title: 'Squid Game',
    image:
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=225&fit=crop',
    year: 2023,
    duration: '1h',
    rating: 'TV-MA',
    genre: 'Action, Drama, Thriller',
    description:
      "Hundreds of cash-strapped players accept a strange invitation to compete in children's games for a tempting prize.",
  },
  {
    id: '8',
    title: 'The Witcher',
    image:
      'https://images.unsplash.com/photo-1544654803-b69140b285a1?w=400&h=225&fit=crop',
    year: 2023,
    duration: '1h',
    rating: 'TV-MA',
    genre: 'Action, Adventure, Fantasy',
    description:
      'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
  },
];

// Categorized movies for different rows
export const trendingNow = mockMovies.slice(0, 6);
export const actionMovies = mockMovies.filter((movie) =>
  movie.genre.includes('Action')
);
export const dramaMovies = mockMovies.filter((movie) =>
  movie.genre.includes('Drama')
);
export const sciFiMovies = mockMovies.filter((movie) =>
  movie.genre.includes('Sci-Fi')
);
export const thrillerMovies = mockMovies.filter((movie) =>
  movie.genre.includes('Thriller')
);
export const newReleases = mockMovies.slice(2, 8);
export const topRated = [...mockMovies].sort(() => Math.random() - 0.5);
