import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';
import { SearchService } from '../services/search.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HighlightDirective } from '../directives/highlight.directive';


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
  searchResults: any[] = [];
  private searchSubscription!: Subscription;
  loading = false;


  constructor(
    private userService: UserService, 
    private searchService: SearchService, 
    private router: Router
  ){}

  ngOnInit() {
    this.searchSubscription = this.searchService.searchQuery$.subscribe(query => {
      if (query) {
        this.searchUserById(query);
      } else {
        this.searchResults = [];
      }
    });
  }

  searchUserById(id: string) {
    this.loading = true;
    this.userService.getUserById(Number(id)).subscribe(data => {
      this.searchResults = data.data ? [data.data] : [];
      this.loading = false;
    });
  }

  onCardClick(id: number) {
    this.router.navigate([`/user/${id}`]);
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    this.searchService.clearSearchQuery();
  }

}
