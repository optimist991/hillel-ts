// Filters
interface MatchFilter {
  filter: string;
}

interface RangeFilter {
  filter: number;
  filterTo: number;
}

interface ValuesFilter<T> {
  values: T[];
}

// Base filter types
interface FilmFilters {
  name?: MatchFilter;
  year?: RangeFilter;
  rate?: RangeFilter;
  oscar?: ValuesFilter<string>;
}

interface CategoryFilters {
  name?: MatchFilter;
}

// Film and category type
interface Film {
  name: string;
  year: number;
  rate: number;
  awards: string[];
}

interface Category {
  name: string;
  films: Film[];
}

// State interface
interface FilterableList<T, F> {
  items: T[];
  filters: F;
  applySearchValue: (search: Partial<F>) => void;
  applyFiltersValue?: (filters: Partial<F>) => void;
}

// Implementations
class FilmList implements FilterableList<Film, FilmFilters> {
  items: Film[] = [];
  filters: FilmFilters = {};

  applySearchValue(search: Partial<FilmFilters>) {
    this.filters = { ...this.filters, ...search };
  }

  applyFiltersValue(filters: Partial<FilmFilters>) {
    this.filters = { ...this.filters, ...filters };
  }
}

class CategoryList implements FilterableList<Category, CategoryFilters> {
  items: Category[] = [];
  filters: CategoryFilters = {};

  applySearchValue(search: Partial<CategoryFilters>) {
    this.filters = { ...this.filters, ...search };
  }
}

// Test scenarios
const films: Film[] = [
  {
    name: 'Back to the Future',
    year: 1985,
    rate: 9.9,
    awards: ['Best Cinematography'],
  },
  { name: 'The Godfather', year: 1972, rate: 9.2, awards: ['Best Picture'] },
  {
    name: 'Titanic',
    year: 1997,
    rate: 7.8,
    awards: ['Best Picture', 'Best Director'],
  },
];

const categories: Category[] = [
  { name: 'Classics', films: [films[1]] },
  { name: 'Blockbusters', films: [films[0], films[2]] },
];

const filmList = new FilmList();
filmList.items = films;
filmList.applySearchValue({ name: { filter: 'Godfather' } });
filmList.applyFiltersValue({ rate: { filter: 8, filterTo: 10 } });
console.log('Film Filters:', filmList.filters);

const categoryList = new CategoryList();
categoryList.items = categories;
categoryList.applySearchValue({ name: { filter: 'Blockbusters' } });
console.log('Category Filters:', categoryList.filters);

const filmListTwo = new FilmList();
filmListTwo.items = films;
filmListTwo.applySearchValue({ name: { filter: 'Back to the Future' } });
filmListTwo.applyFiltersValue({ rate: { filter: 7, filterTo: 10 } });
console.log('Film Filters:', filmListTwo.filters);
