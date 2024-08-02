import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatPaginatorModule, MatProgressSpinnerModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit, OnDestroy{
  users: any[] = [];
  totalUsers!:number;
  perPage!: number;
  private searchSubscription!: Subscription;
  loading = false;


  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.fetchUsers(1);

    this.searchSubscription = this.userService.searchQuery$.subscribe(query => {
      if (query) {
        this.searchUserById(query);
      } else {
        this.fetchUsers(1);
      }
    });
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

  searchUserById(id: string) {
    this.loading = true;
    this.userService.getUserById(Number(id)).subscribe(data => {
      this.users = [data.data];
      this.totalUsers = 1;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

}
