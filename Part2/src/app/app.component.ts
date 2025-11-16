/**
 * Author: Student Name
 * Assignment: PROG2005 Assessment 2 - Part 2
 * Description: Root component for Angular Inventory Management System
 */

import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Inventory Management System';
  menuOpen = false;

  // Toggle mobile menu
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  // Close menu when clicking outside or on a link
  closeMenu(): void {
    this.menuOpen = false;
  }
}
