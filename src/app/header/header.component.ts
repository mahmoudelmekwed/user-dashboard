import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatInputModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  onSearch(event: Event) {}

}
