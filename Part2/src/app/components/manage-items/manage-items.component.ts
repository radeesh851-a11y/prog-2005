/**
 * Author: Student Name
 * Assignment: PROG2005 Assessment 2 - Part 2
 * Description: Component for managing inventory items (add, edit, delete)
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem, Category, StockStatus, PopularItem } from '../../models/inventory-item.model';

@Component({
  selector: 'app-manage-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-items.component.html',
  styleUrls: ['./manage-items.component.css']
})
export class ManageItemsComponent implements OnInit {
  items: InventoryItem[] = [];
  message = '';
  messageType: 'success' | 'error' = 'success';
  showDeleteConfirmation = false;
  itemToDelete = '';

  // Categories and options for dropdowns
  categories: Category[] = ['Electronics', 'Furniture', 'Clothing', 'Tools', 'Miscellaneous'];
  stockStatuses: StockStatus[] = ['In Stock', 'Low Stock', 'Out of Stock'];
  popularOptions: PopularItem[] = ['Yes', 'No'];

  // Form models
  newItem: InventoryItem = this.getEmptyItem();
  updateSearchName = '';
  updateItem: InventoryItem = this.getEmptyItem();
  deleteItemName = '';

  // Tab selection
  activeTab: 'add' | 'update' | 'delete' | 'view' = 'add';

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadItems();
    this.inventoryService.inventory$.subscribe(items => {
      this.items = items;
    });
  }

  // Get empty item template
  private getEmptyItem(): InventoryItem {
    return {
      itemId: '',
      itemName: '',
      category: 'Electronics',
      quantity: 0,
      price: 0,
      supplierName: '',
      stockStatus: 'In Stock',
      popularItem: 'No',
      comment: ''
    };
  }

  // Load all items
  loadItems(): void {
    this.items = this.inventoryService.getAllItems();
  }

  // Add new item
  addItem(): void {
    const result = this.inventoryService.addItem(this.newItem);
    this.showMessage(result.message, result.success ? 'success' : 'error');
    
    if (result.success) {
      this.newItem = this.getEmptyItem();
    }
  }

  // Load item for update
  loadItemForUpdate(): void {
    if (!this.updateSearchName.trim()) {
      this.showMessage('Please enter an item name', 'error');
      return;
    }

    const item = this.inventoryService.getItemByName(this.updateSearchName);
    if (item) {
      this.updateItem = { ...item };
      this.showMessage('Item loaded successfully', 'success');
    } else {
      this.showMessage('Item not found', 'error');
    }
  }

  // Update existing item
  updateExistingItem(): void {
    if (!this.updateSearchName.trim()) {
      this.showMessage('Please load an item first', 'error');
      return;
    }

    const result = this.inventoryService.updateItem(this.updateSearchName, this.updateItem);
    this.showMessage(result.message, result.success ? 'success' : 'error');
    
    if (result.success) {
      this.updateSearchName = '';
      this.updateItem = this.getEmptyItem();
    }
  }

  // Initiate delete
  initiateDelete(): void {
    if (!this.deleteItemName.trim()) {
      this.showMessage('Please enter an item name', 'error');
      return;
    }

    const item = this.inventoryService.getItemByName(this.deleteItemName);
    if (item) {
      this.itemToDelete = this.deleteItemName;
      this.showDeleteConfirmation = true;
    } else {
      this.showMessage('Item not found', 'error');
    }
  }

  // Confirm delete
  confirmDelete(): void {
    const result = this.inventoryService.deleteItem(this.itemToDelete);
    this.showMessage(result.message, result.success ? 'success' : 'error');
    
    if (result.success) {
      this.deleteItemName = '';
    }
    
    this.cancelDelete();
  }

  // Cancel delete
  cancelDelete(): void {
    this.showDeleteConfirmation = false;
    this.itemToDelete = '';
  }

  // Show all items
  showAllItems(): void {
    this.items = this.inventoryService.getAllItems();
  }

  // Show popular items
  showPopularItems(): void {
    this.items = this.inventoryService.getPopularItems();
  }

  // Show message
  showMessage(message: string, type: 'success' | 'error'): void {
    this.message = message;
    this.messageType = type;
    
    setTimeout(() => {
      this.message = '';
    }, 5000);
  }

  // Change active tab
  setActiveTab(tab: 'add' | 'update' | 'delete' | 'view'): void {
    this.activeTab = tab;
    this.message = '';
  }

  getStatusClass(stockStatus: StockStatus): string {
    return 'status-' + stockStatus.toLowerCase().replace(/\s+/g, '-');
  }
}
