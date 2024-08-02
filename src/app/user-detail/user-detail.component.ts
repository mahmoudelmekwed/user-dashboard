import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  user: any;
  private searchSubscription!: Subscription;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ){}

  ngOnInit() {
    this.fetchUserDetails();

    this.searchSubscription = this.userService.searchQuery$.subscribe(query => {
      if (query) {
        this.loading = true;
        this.userService.getUserById(Number(query)).subscribe(data => {
          this.user = data.data;
          this.loading = false;
        });
      } else {
        this.fetchUserDetails();
      }
    });
  }

  fetchUserDetails() {
    this.loading = true;
    const userId = this.route.snapshot.params['id'];
    this.userService.getUserById(userId).subscribe(data => {
      this.user = data.data;
      this.loading = false;
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

}
