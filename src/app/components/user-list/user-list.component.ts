import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HighlightDirective } from '../../directives/highlight.directive';
import { BubblePaginationDirective } from '../../directives/bubble-pagination.directive';
import { User } from '../../models/user.models';

/**
 * UserListComponent displays a paginated list of users.
 * It fetches user data from the user service and provides pagination functionality.
 */
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatPaginatorModule, 
    MatProgressSpinnerModule, 
    HighlightDirective,
    BubblePaginationDirective,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{
  users: User[] = [];
  totalUsers!:number;
  perPage!: number;
  loading = false;


  constructor(private userService: UserService, private router: Router) {}


    /**
   * Initializes the component.
   * Fetches the first page of users when the component is loaded.
   */
  ngOnInit() {
    this.fetchUsers(1);
  }

    /**
   * Fetches users for a specific page from the user service.
   * Updates the list of users, total users, and the number of users per page.
   * @param page - The page number to fetch
   */

  fetchUsers(page: number) {
    this.loading = true;
    this.userService.getUsers(page).subscribe(data => {
      this.users = data.data;
      this.totalUsers = data.total;
      this.perPage = data.per_page;
      this.loading = false;
    });
  }

    /**
   * Handles pagination events.
   * Fetches users for the new page when the page index changes.
   * @param event - The pagination event containing the new page index
   */

  onPageChange(event: PageEvent) {
    this.fetchUsers(event.pageIndex + 1);
  }

    /**
   * Navigates to the user detail page when a user card is clicked.
   * @param id - The ID of the user to navigate to
   */
  onCardClick(id: number) {
    this.router.navigate([`/user/${id}`]);
  }

}
