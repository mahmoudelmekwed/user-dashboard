import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';

import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HighlightDirective } from '../../directives/highlight.directive';
import { User } from '../../models/user.models';
import { UserService } from '../../services/user.service';
import { SearchService } from '../../services/search.service';

/**
 * SearchResultsComponent displays search results based on the user's search query.
 * It shows user details in cards and handles navigation to user detail pages.
 */
@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatProgressSpinnerModule,
    HighlightDirective,
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
    /**
   * Defines animations for user cards when they enter or leave the view.
   * The 'cardAnimation' trigger handles the animation effects applied to card elements.
   */
  animations: [
    trigger('cardAnimation', [
      state('void', style({ opacity: 0, transform: 'translateY(-20px)' })),
      transition(':enter, :leave', [
        animate('0.5s ease-in-out')
      ])
    ])
  ]
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  searchResults:User[]= [];
  private searchSubscription!: Subscription;
  loading = false;


  constructor(
    private userService: UserService, 
    private searchService: SearchService, 
    private router: Router
  ){}

    /**
   * Initializes the component.
   * Subscribes to the search query observable and fetches user data based on the query.
   */
  ngOnInit() {
    this.searchSubscription = this.searchService.searchQuery$.subscribe(query => {
      if (query) {
        this.searchUserById(query);
      } else {
        this.searchResults = [];
      }
    });
  }

    /**
   * Fetches user details by ID and updates the search results.
   * @param id - The ID of the user to fetch
   */

  searchUserById(id: string) {
    this.loading = true;
    this.userService.getUserById(Number(id)).subscribe(data => {
      this.searchResults = data.data ? [data.data] : [];
      this.loading = false;
    });
  }

    /**
   * Handles card click events and navigates to the user detail page.
   * @param id - The ID of the user to navigate to
   */

  onCardClick(id: number) {
    this.router.navigate([`/user/${id}`]);
  }

    /**
   * Cleans up resources when the component is destroyed.
   * Unsubscribes from the search query observable and clears the search query.
   */

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    this.searchService.clearSearchQuery();
  }

}
