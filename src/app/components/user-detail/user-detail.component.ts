import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from '../../models/user.models';
import { UserService } from '../../services/user.service';


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

  ngOnInit() {
    this.fetchUserDetails();
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

}
