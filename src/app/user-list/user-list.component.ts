import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatPaginatorModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{
  users: any[] = [];
  totalUsers!:number;
  perPage!: number;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.fetchUsers(1);
  }

  fetchUsers(page: number) {
    this.userService.getUsers(page).subscribe(data => {
      this.users = data.data;
      this.totalUsers = data.total;
      this.perPage = data.per_page;
    });
  }

  onPageChange(event: PageEvent) {
    this.fetchUsers(event.pageIndex + 1);
  }

  viewUser(id: number) {
    this.router.navigate([`/user/${id}`]);
  }

}
