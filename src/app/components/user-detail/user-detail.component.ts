import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from '../../models/user.models';
import { UserService } from '../../services/user.service';

/**
 * UserDetailComponent displays detailed information about a specific user.
 * It fetches user data based on the user ID from the route parameters and provides a back button to navigate to the home page.
 */

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  user!: User;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ){}

    /**
   * Initializes the component.
   * Calls the method to fetch user details based on the user ID from route parameters.
   */

  ngOnInit() {
    this.fetchUserDetails();
  }


   /**
   * Fetches user details by ID from the user service.
   * Sets the loading flag to true while the request is in progress and updates the user data once the request completes.
   */

  fetchUserDetails() {
    this.loading = true;
    const userId = this.route.snapshot.params['id'];
    this.userService.getUserById(userId).subscribe(data => {
      this.user = data.data;
      this.loading = false;
    });
  }

    /**
   * Navigates back to the home page.
   */

  goBack() {
    this.router.navigate(['/']);
  }

}
