import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { BrowseComponent } from './features/browse/browse.component';
import { DetailsComponent } from './features/details/details.component';
import { LoginComponent } from './features/auth/login.component';
import { SignupComponent } from './features/auth/signup.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: '**', redirectTo: '' },
];
