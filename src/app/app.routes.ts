import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

export const routes: Routes = [
    { path: '', component: UserListComponent },
    { path: 'user-list', component: UserListComponent },
    { path: 'user/:id', component: UserDetailComponent },
    { path: 'search', component: SearchResultsComponent }
];
