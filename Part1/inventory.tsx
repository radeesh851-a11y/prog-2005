/**
 * Author: Student Name
 * Assignment: PROG2005 Assessment 2 - Part 1
 * Description: TypeScript-based Inventory Management System
 */

// Interface defining the structure of an inventory item
interface InventoryItem {
  itemId: string;
  itemName: string;
  category: 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous';
  quantity: number;
  price: number;
  supplierName: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  popularItem: 'Yes' | 'No';
  comment?: string; // Optional field
}

// Class to manage the inventory system
class InventoryManager {
  private inventory: InventoryItem[] = [];

  constructor() {
    // Initialize with some hardcoded data for demonstration
    this.initializeData();
  }

  // Initialize inventory with sample data
  private initializeData(): void {
    this.inventory = [
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
      }
    ];
  }

  // Validate if item ID is unique
  private isUniqueItemId(itemId: string, excludeId?: string): boolean {
    return !this.inventory.some(item => 
      item.itemId === itemId && item.itemId !== excludeId
    );
  }

  // Validate required fields
  private validateItem(item: Partial<InventoryItem>, isUpdate: boolean = false): string | null {
    if (!isUpdate && !item.itemId) return 'Item ID is required';
    if (!item.itemName) return 'Item Name is required';
    if (!item.category) return 'Category is required';
    if (item.quantity === undefined || item.quantity < 0) return 'Valid quantity is required';
    if (!item.price || item.price <= 0) return 'Valid price is required';
    if (!item.supplierName) return 'Supplier Name is required';
    if (!item.stockStatus) return 'Stock Status is required';
    if (!item.popularItem) return 'Popular Item status is required';
    
    return null;
  }

  // Add a new item to the inventory
  addItem(item: InventoryItem): { success: boolean; message: string } {
    const validationError = this.validateItem(item);
    if (validationError) {
      return { success: false, message: validationError };
    }

    if (!this.isUniqueItemId(item.itemId)) {
      return { success: false, message: 'Item ID must be unique' };
    }

    this.inventory.push(item);
    return { success: true, message: 'Item added successfully' };
  }

  // Update an existing item by name
  updateItem(itemName: string, updatedData: Partial<InventoryItem>): { success: boolean; message: string } {
    const index = this.inventory.findIndex(item => 
      item.itemName.toLowerCase() === itemName.toLowerCase()
    );

    if (index === -1) {
      return { success: false, message: 'Item not found' };
    }

    const validationError = this.validateItem(updatedData, true);
    if (validationError) {
      return { success: false, message: validationError };
    }

    // Check if updating item ID to a duplicate
    if (updatedData.itemId && !this.isUniqueItemId(updatedData.itemId, this.inventory[index].itemId)) {
      return { success: false, message: 'Item ID must be unique' };
    }

    this.inventory[index] = { ...this.inventory[index], ...updatedData };
    return { success: true, message: 'Item updated successfully' };
  }

  // Delete an item by name with confirmation
  deleteItem(itemName: string, confirmed: boolean = false): { success: boolean; message: string; requiresConfirmation?: boolean } {
    const index = this.inventory.findIndex(item => 
      item.itemName.toLowerCase() === itemName.toLowerCase()
    );

    if (index === -1) {
      return { success: false, message: 'Item not found' };
    }

    if (!confirmed) {
      return { 
        success: false, 
        message: `Are you sure you want to delete "${this.inventory[index].itemName}"?`,
        requiresConfirmation: true 
      };
    }

    this.inventory.splice(index, 1);
    return { success: true, message: 'Item deleted successfully' };
  }

  // Search for items by name
  searchByName(searchTerm: string): InventoryItem[] {
    return this.inventory.filter(item => 
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Get all items
  getAllItems(): InventoryItem[] {
    return [...this.inventory];
  }

  // Get all popular items
  getPopularItems(): InventoryItem[] {
    return this.inventory.filter(item => item.popularItem === 'Yes');
  }

  // Get item by name for editing
  getItemByName(itemName: string): InventoryItem | undefined {
    return this.inventory.find(item => 
      item.itemName.toLowerCase() === itemName.toLowerCase()
    );
  }
}

// UI Controller class to handle all UI interactions
class InventoryUI {
  private manager: InventoryManager;
  private pendingDelete: string | null = null;

  constructor() {
    this.manager = new InventoryManager();
    this.initializeUI();
    this.displayAllItems();
  }

  // Initialize UI event listeners
  private initializeUI(): void {
    // Add item form submission
    const addForm = document.getElementById('addItemForm') as HTMLFormElement;
    if (addForm) {
      addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleAddItem();
      });
    }

    // Update item form submission
    const updateForm = document.getElementById('updateItemForm') as HTMLFormElement;
    if (updateForm) {
      updateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleUpdateItem();
      });
    }

    // Search functionality
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => this.handleSearch());
    }

    // Display buttons
    const displayAllBtn = document.getElementById('displayAllBtn');
    if (displayAllBtn) {
      displayAllBtn.addEventListener('click', () => this.displayAllItems());
    }

    const displayPopularBtn = document.getElementById('displayPopularBtn');
    if (displayPopularBtn) {
      displayPopularBtn.addEventListener('click', () => this.displayPopularItems());
    }

    // Delete functionality
    const deleteBtn = document.getElementById('deleteBtn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => this.handleDelete());
    }

    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (confirmDeleteBtn) {
      confirmDeleteBtn.addEventListener('click', () => this.confirmDelete());
    }

    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    if (cancelDeleteBtn) {
      cancelDeleteBtn.addEventListener('click', () => this.cancelDelete());
    }

    // Load item for update
    const loadUpdateBtn = document.getElementById('loadUpdateBtn');
    if (loadUpdateBtn) {
      loadUpdateBtn.addEventListener('click', () => this.loadItemForUpdate());
    }
  }

  // Handle adding a new item
  private handleAddItem(): void {
    const item: InventoryItem = {
      itemId: (document.getElementById('itemId') as HTMLInputElement).value.trim(),
      itemName: (document.getElementById('itemName') as HTMLInputElement).value.trim(),
      category: (document.getElementById('category') as HTMLSelectElement).value as any,
      quantity: parseInt((document.getElementById('quantity') as HTMLInputElement).value),
      price: parseFloat((document.getElementById('price') as HTMLInputElement).value),
      supplierName: (document.getElementById('supplierName') as HTMLInputElement).value.trim(),
      stockStatus: (document.getElementById('stockStatus') as HTMLSelectElement).value as any,
      popularItem: (document.getElementById('popularItem') as HTMLSelectElement).value as any,
      comment: (document.getElementById('comment') as HTMLTextAreaElement).value.trim() || undefined
    };

    const result = this.manager.addItem(item);
    this.showMessage(result.message, result.success ? 'success' : 'error');

    if (result.success) {
      (document.getElementById('addItemForm') as HTMLFormElement).reset();
      this.displayAllItems();
    }
  }

  // Load item data for updating
  private loadItemForUpdate(): void {
    const itemName = (document.getElementById('updateSearchName') as HTMLInputElement).value.trim();
    if (!itemName) {
      this.showMessage('Please enter an item name to load', 'error');
      return;
    }

    const item = this.manager.getItemByName(itemName);
    if (!item) {
      this.showMessage('Item not found', 'error');
      return;
    }

    // Populate update form
    (document.getElementById('updateItemId') as HTMLInputElement).value = item.itemId;
    (document.getElementById('updateItemName') as HTMLInputElement).value = item.itemName;
    (document.getElementById('updateCategory') as HTMLSelectElement).value = item.category;
    (document.getElementById('updateQuantity') as HTMLInputElement).value = item.quantity.toString();
    (document.getElementById('updatePrice') as HTMLInputElement).value = item.price.toString();
    (document.getElementById('updateSupplierName') as HTMLInputElement).value = item.supplierName;
    (document.getElementById('updateStockStatus') as HTMLSelectElement).value = item.stockStatus;
    (document.getElementById('updatePopularItem') as HTMLSelectElement).value = item.popularItem;
    (document.getElementById('updateComment') as HTMLTextAreaElement).value = item.comment || '';

    this.showMessage('Item loaded successfully', 'success');
  }

  // Handle updating an item
  private handleUpdateItem(): void {
    const itemName = (document.getElementById('updateSearchName') as HTMLInputElement).value.trim();
    
    const updatedData: Partial<InventoryItem> = {
      itemId: (document.getElementById('updateItemId') as HTMLInputElement).value.trim(),
      itemName: (document.getElementById('updateItemName') as HTMLInputElement).value.trim(),
      category: (document.getElementById('updateCategory') as HTMLSelectElement).value as any,
      quantity: parseInt((document.getElementById('updateQuantity') as HTMLInputElement).value),
      price: parseFloat((document.getElementById('updatePrice') as HTMLInputElement).value),
      supplierName: (document.getElementById('updateSupplierName') as HTMLInputElement).value.trim(),
      stockStatus: (document.getElementById('updateStockStatus') as HTMLSelectElement).value as any,
      popularItem: (document.getElementById('updatePopularItem') as HTMLSelectElement).value as any,
      comment: (document.getElementById('updateComment') as HTMLTextAreaElement).value.trim() || undefined
    };

    const result = this.manager.updateItem(itemName, updatedData);
    this.showMessage(result.message, result.success ? 'success' : 'error');

    if (result.success) {
      (document.getElementById('updateItemForm') as HTMLFormElement).reset();
      (document.getElementById('updateSearchName') as HTMLInputElement).value = '';
      this.displayAllItems();
    }
  }

  // Handle search
  private handleSearch(): void {
    const searchTerm = (document.getElementById('searchTerm') as HTMLInputElement).value.trim();
    if (!searchTerm) {
      this.showMessage('Please enter a search term', 'error');
      return;
    }

    const results = this.manager.searchByName(searchTerm);
    this.displayItems(results, `Search Results for "${searchTerm}"`);
  }

  // Handle delete initiation
  private handleDelete(): void {
    const itemName = (document.getElementById('deleteItemName') as HTMLInputElement).value.trim();
    if (!itemName) {
      this.showMessage('Please enter an item name to delete', 'error');
      return;
    }

    const result = this.manager.deleteItem(itemName, false);
    if (result.requiresConfirmation) {
      this.pendingDelete = itemName;
      document.getElementById('deleteConfirmation')!.style.display = 'block';
      document.getElementById('confirmationMessage')!.innerHTML = result.message;
    } else {
      this.showMessage(result.message, 'error');
    }
  }

  // Confirm delete
  private confirmDelete(): void {
    if (this.pendingDelete) {
      const result = this.manager.deleteItem(this.pendingDelete, true);
      this.showMessage(result.message, result.success ? 'success' : 'error');
      
      if (result.success) {
        (document.getElementById('deleteItemName') as HTMLInputElement).value = '';
        this.displayAllItems();
      }
      
      this.cancelDelete();
    }
  }

  // Cancel delete
  private cancelDelete(): void {
    this.pendingDelete = null;
    document.getElementById('deleteConfirmation')!.style.display = 'none';
    document.getElementById('confirmationMessage')!.innerHTML = '';
  }

  // Display all items
  private displayAllItems(): void {
    const items = this.manager.getAllItems();
    this.displayItems(items, 'All Items');
  }

  // Display popular items
  private displayPopularItems(): void {
    const items = this.manager.getPopularItems();
    this.displayItems(items, 'Popular Items');
  }

  // Generic method to display items
  private displayItems(items: InventoryItem[], title: string): void {
    const displayArea = document.getElementById('displayArea');
    if (!displayArea) return;

    if (items.length === 0) {
      displayArea.innerHTML = `<h3>${title}</h3><p class="no-items">No items found</p>`;
      return;
    }

    let html = `<h3>${title}</h3>`;
    html += '<div class="items-grid">';

    items.forEach(item => {
      html += `
        <div class="item-card">
          <div class="item-header">
            <h4>${item.itemName}</h4>
            ${item.popularItem === 'Yes' ? '<span class="popular-badge">⭐ Popular</span>' : ''}
          </div>
          <div class="item-details">
            <p><strong>ID:</strong> ${item.itemId}</p>
            <p><strong>Category:</strong> ${item.category}</p>
            <p><strong>Quantity:</strong> ${item.quantity}</p>
            <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
            <p><strong>Supplier:</strong> ${item.supplierName}</p>
            <p><strong>Status:</strong> <span class="status-${item.stockStatus.replace(/\s+/g, '-').toLowerCase()}">${item.stockStatus}</span></p>
            ${item.comment ? `<p><strong>Comment:</strong> ${item.comment}</p>` : ''}
          </div>
        </div>
      `;
    });

    html += '</div>';
    displayArea.innerHTML = html;
  }

  // Show message to user
  private showMessage(message: string, type: 'success' | 'error'): void {
    const messageArea = document.getElementById('messageArea');
    if (!messageArea) return;

    messageArea.className = `message ${type}`;
    messageArea.innerHTML = message;
    messageArea.style.display = 'block';

    setTimeout(() => {
      messageArea.style.display = 'none';
    }, 5000);
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new InventoryUI();
});
