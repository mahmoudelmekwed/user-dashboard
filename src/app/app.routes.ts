import { Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { SearchResultsComponent } from './search-results/search-results.component';

export const routes: Routes = [
    { path: '', component: UserListComponent },
    { path: 'user-list', component: UserListComponent },
    { path: 'user/:id', component: UserDetailComponent },
    { path: 'search', component: SearchResultsComponent }
];
