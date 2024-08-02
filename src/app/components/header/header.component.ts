import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

/**
 * HeaderComponent is responsible for displaying the search bar and home button.
 * It allows users to search by ID and navigate to different parts of the application.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatInputModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  searchQuery: string = '';
  private searchSubscription!: Subscription;


  constructor(
    private searchService: SearchService,
    private router: Router,
  ) {}

    /**
   * Initializes the component.
   * Subscribes to the search query observable to update the search query in the component.
   */

  ngOnInit() {
    this.searchSubscription = this.searchService.searchQuery$.subscribe(query => {
      if (!query) {
        this.searchQuery = '';
      }
    });
  }

    /**
   * Handles search input changes.
   * Updates the search query in the search service and navigates to the search results page.
   * If the search query is empty, navigates to the user list page.
   */

  onSearch() {
    if (this.searchQuery) {
    this.searchService.setSearchQuery(this.searchQuery);
    this.router.navigate(['/search']);
    } else {
      this.navigateToHome();
    }
  }

   /**
   * Navigates to the user list page and clears the search query.
   */

  navigateToHome() {
    this.searchService.clearSearchQuery();
    this.router.navigate(['/user-list']);
  }

    /**
   * Cleans up resources when the component is destroyed.
   * Unsubscribes from the search query observable to prevent memory leaks.
   */

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

}
