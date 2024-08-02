import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Service responsible for managing the search query state.
 */
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchQuerySubject = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuerySubject.asObservable();

  constructor() { }

    /**
   * Updates the search query value.
   * 
   * @param query - The search query string to be set
   */
  setSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
  }

    /**
   * Clears the current search query value by setting it to an empty string.
   */
  clearSearchQuery() {
    this.searchQuerySubject.next('');
  }
}
