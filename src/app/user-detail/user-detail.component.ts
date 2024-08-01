import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  user: any;
  private searchSubscription!: Subscription;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ){}

  ngOnInit() {
    this.fetchUserDetails();

    this.searchSubscription = this.userService.searchQuery$.subscribe(query => {
      if (query) {
        this.userService.getUserById(Number(query)).subscribe(data => {
          this.user = data.data;
        });
      } else {
        this.fetchUserDetails();
      }
    });
  }

  fetchUserDetails() {
    const userId = this.route.snapshot.params['id'];
    this.userService.getUserById(userId).subscribe(data => {
      this.user = data.data;
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
