/**
 * Author: Student Name
 * Assignment: PROG2005 Assessment 2 - Part 2
 * Description: Application routing configuration
 */

import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ManageItemsComponent } from './components/manage-items/manage-items.component';
import { SearchComponent } from './components/search/search.component';
import { SecurityComponent } from './components/security/security.component';
import { HelpComponent } from './components/help/help.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'manage', component: ManageItemsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'security', component: SecurityComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', redirectTo: '' }
];
