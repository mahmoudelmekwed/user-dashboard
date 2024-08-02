import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HighlightDirective } from '../directives/highlight.directive';
import { BubblePaginationDirective } from '../directives/bubble-pagination.directive';

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
  users: any[] = [];
  totalUsers!:number;
  perPage!: number;
  loading = false;


  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.fetchUsers(1);
  }

  fetchUsers(page: number) {
    this.loading = true;
    this.userService.getUsers(page).subscribe(data => {
      this.users = data.data;
      this.totalUsers = data.total;
      this.perPage = data.per_page;
      this.loading = false;
    });
  }

  onPageChange(event: PageEvent) {
    this.fetchUsers(event.pageIndex + 1);
  }

  onCardClick(id: number) {
    this.router.navigate([`/user/${id}`]);
  }

}
