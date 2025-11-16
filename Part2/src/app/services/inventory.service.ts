/**
 * Author: Student Name
 * Assignment: PROG2005 Assessment 2 - Part 2
 * Description: Service for managing inventory data and operations
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InventoryItem } from '../models/inventory-item.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private inventorySubject = new BehaviorSubject<InventoryItem[]>([]);
  public inventory$ = this.inventorySubject.asObservable();

  constructor() {
    this.initializeData();
  }

  // Initialize with sample data
  private initializeData(): void {
    const initialData: InventoryItem[] = [
      {
        itemId: 'ELEC001',
        itemName: 'Samsung 55" TV',
        category: 'Electronics',
        quantity: 15,
        price: 899.99,
        supplierName: 'Samsung Electronics',
        stockStatus: 'In Stock',
        popularItem: 'Yes',
        comment: 'Best selling TV model'
      },
      {
        itemId: 'FURN001',
        itemName: 'Office Desk',
        category: 'Furniture',
        quantity: 5,
        price: 299.99,
        supplierName: 'Office Furniture Co',
        stockStatus: 'Low Stock',
        popularItem: 'No',
        comment: 'Ergonomic design'
      },
      {
        itemId: 'CLOT001',
        itemName: 'Cotton T-Shirt',
        category: 'Clothing',
        quantity: 0,
        price: 29.99,
        supplierName: 'Fashion Hub',
        stockStatus: 'Out of Stock',
        popularItem: 'Yes'
      },
      {
        itemId: 'TOOL001',
        itemName: 'Power Drill',
        category: 'Tools',
        quantity: 20,
        price: 149.99,
        supplierName: 'Tool Master',
        stockStatus: 'In Stock',
        popularItem: 'Yes',
        comment: 'Professional grade'
      },
      {
        itemId: 'ELEC002',
        itemName: 'Wireless Headphones',
        category: 'Electronics',
        quantity: 30,
        price: 199.99,
        supplierName: 'Audio Tech',
        stockStatus: 'In Stock',
        popularItem: 'Yes',
        comment: 'Noise cancelling'
      }
    ];
    this.inventorySubject.next(initialData);
  }

  // Get all items
  getAllItems(): InventoryItem[] {
    return this.inventorySubject.value;
  }

  // Get popular items
  getPopularItems(): InventoryItem[] {
    return this.inventorySubject.value.filter(item => item.popularItem === 'Yes');
  }

  // Search items by name
  searchByName(searchTerm: string): InventoryItem[] {
    return this.inventorySubject.value.filter(item =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Get item by name
  getItemByName(itemName: string): InventoryItem | undefined {
    return this.inventorySubject.value.find(item =>
      item.itemName.toLowerCase() === itemName.toLowerCase()
    );
  }

  // Check if item ID is unique
  isUniqueItemId(itemId: string, excludeId?: string): boolean {
    return !this.inventorySubject.value.some(item =>
      item.itemId === itemId && item.itemId !== excludeId
    );
  }

  // Add new item
  addItem(item: InventoryItem): { success: boolean; message: string } {
    if (!this.isUniqueItemId(item.itemId)) {
      return { success: false, message: 'Item ID must be unique' };
    }

    const currentInventory = this.inventorySubject.value;
    this.inventorySubject.next([...currentInventory, item]);
    return { success: true, message: 'Item added successfully' };
  }

  // Update item by name
  updateItem(itemName: string, updatedData: InventoryItem): { success: boolean; message: string } {
    const currentInventory = this.inventorySubject.value;
    const index = currentInventory.findIndex(item =>
      item.itemName.toLowerCase() === itemName.toLowerCase()
    );

    if (index === -1) {
      return { success: false, message: 'Item not found' };
    }

    // Check if updating item ID to a duplicate
    if (updatedData.itemId !== currentInventory[index].itemId &&
        !this.isUniqueItemId(updatedData.itemId)) {
      return { success: false, message: 'Item ID must be unique' };
    }

    const newInventory = [...currentInventory];
    newInventory[index] = updatedData;
    this.inventorySubject.next(newInventory);
    return { success: true, message: 'Item updated successfully' };
  }

  // Delete item by name
  deleteItem(itemName: string): { success: boolean; message: string } {
    const currentInventory = this.inventorySubject.value;
    const index = currentInventory.findIndex(item =>
      item.itemName.toLowerCase() === itemName.toLowerCase()
    );

    if (index === -1) {
      return { success: false, message: 'Item not found' };
    }

    const newInventory = currentInventory.filter((_, i) => i !== index);
    this.inventorySubject.next(newInventory);
    return { success: true, message: 'Item deleted successfully' };
  }
}
