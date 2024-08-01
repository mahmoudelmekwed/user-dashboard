import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatInputModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  searchQuery: string = '';

  constructor(
    private userService: UserService,
  ) {}



  onSearch() {
    this.userService.setSearchQuery(this.searchQuery)
  }

}
