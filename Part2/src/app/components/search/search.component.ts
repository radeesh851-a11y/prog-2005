/**
 * Author: Student Name
 * Assignment: PROG2005 Assessment 2 - Part 2
 * Description: Search component for filtering and finding inventory items
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem } from '../../models/inventory-item.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchTerm = '';
  searchResults: InventoryItem[] = [];
  hasSearched = false;

  constructor(private inventoryService: InventoryService) {}

  // Perform search
  performSearch(): void {
    if (!this.searchTerm.trim()) {
      this.searchResults = [];
      this.hasSearched = false;
      return;
    }

    this.searchResults = this.inventoryService.searchByName(this.searchTerm);
    this.hasSearched = true;
  }

  // Clear search
  clearSearch(): void {
    this.searchTerm = '';
    this.searchResults = [];
    this.hasSearched = false;
  }

  getStatusClass(stockStatus: string): string {
    return 'status-' + stockStatus.toLowerCase().replace(/\s+/g, '-');
  }
}
