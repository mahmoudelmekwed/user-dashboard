import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


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

  ngOnInit() {
    this.searchSubscription = this.searchService.searchQuery$.subscribe(query => {
      if (!query) {
        this.searchQuery = '';
      }
    });
  }

  onSearch() {
    if (this.searchQuery) {
    this.searchService.setSearchQuery(this.searchQuery);
    this.router.navigate(['/search']);
    } else {
      this.navigateToHome();
    }
  }

  navigateToHome() {
    this.searchService.clearSearchQuery();
    this.router.navigate(['/user-list']);
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

}
