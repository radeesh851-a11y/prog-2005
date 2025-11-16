"use strict";
/**
 * Author: Student Name
 * Assignment: PROG2005 Assessment 2 - Part 1
 * Description: TypeScript-based Inventory Management System
 */
// Class to manage the inventory system
class InventoryManager {
    constructor() {
        this.inventory = [];
        // Initialize with some hardcoded data for demonstration
        this.initializeData();
    }
    // Initialize inventory with sample data
    initializeData() {
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
    isUniqueItemId(itemId, excludeId) {
        return !this.inventory.some(item => item.itemId === itemId && item.itemId !== excludeId);
    }
    // Validate required fields
    validateItem(item, isUpdate = false) {
        if (!isUpdate && !item.itemId)
            return 'Item ID is required';
        if (!item.itemName)
            return 'Item Name is required';
        if (!item.category)
            return 'Category is required';
        if (item.quantity === undefined || item.quantity < 0)
            return 'Valid quantity is required';
        if (!item.price || item.price <= 0)
            return 'Valid price is required';
        if (!item.supplierName)
            return 'Supplier Name is required';
        if (!item.stockStatus)
            return 'Stock Status is required';
        if (!item.popularItem)
            return 'Popular Item status is required';
        return null;
    }
    // Add a new item to the inventory
    addItem(item) {
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
    updateItem(itemName, updatedData) {
        const index = this.inventory.findIndex(item => item.itemName.toLowerCase() === itemName.toLowerCase());
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
        this.inventory[index] = Object.assign(Object.assign({}, this.inventory[index]), updatedData);
        return { success: true, message: 'Item updated successfully' };
    }
    // Delete an item by name with confirmation
    deleteItem(itemName, confirmed = false) {
        const index = this.inventory.findIndex(item => item.itemName.toLowerCase() === itemName.toLowerCase());
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
    searchByName(searchTerm) {
        return this.inventory.filter(item => item.itemName.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    // Get all items
    getAllItems() {
        return [...this.inventory];
    }
    // Get all popular items
    getPopularItems() {
        return this.inventory.filter(item => item.popularItem === 'Yes');
    }
    // Get item by name for editing
    getItemByName(itemName) {
        return this.inventory.find(item => item.itemName.toLowerCase() === itemName.toLowerCase());
    }
}
// UI Controller class to handle all UI interactions
class InventoryUI {
    constructor() {
        this.pendingDelete = null;
        this.manager = new InventoryManager();
        this.initializeUI();
        this.displayAllItems();
    }
    // Initialize UI event listeners
    initializeUI() {
        // Add item form submission
        const addForm = document.getElementById('addItemForm');
        if (addForm) {
            addForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAddItem();
            });
        }
        // Update item form submission
        const updateForm = document.getElementById('updateItemForm');
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
    handleAddItem() {
        const item = {
            itemId: document.getElementById('itemId').value.trim(),
            itemName: document.getElementById('itemName').value.trim(),
            category: document.getElementById('category').value,
            quantity: parseInt(document.getElementById('quantity').value),
            price: parseFloat(document.getElementById('price').value),
            supplierName: document.getElementById('supplierName').value.trim(),
            stockStatus: document.getElementById('stockStatus').value,
            popularItem: document.getElementById('popularItem').value,
            comment: document.getElementById('comment').value.trim() || undefined
        };
        const result = this.manager.addItem(item);
        this.showMessage(result.message, result.success ? 'success' : 'error');
        if (result.success) {
            document.getElementById('addItemForm').reset();
            this.displayAllItems();
        }
    }
    // Load item data for updating
    loadItemForUpdate() {
        const itemName = document.getElementById('updateSearchName').value.trim();
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
        document.getElementById('updateItemId').value = item.itemId;
        document.getElementById('updateItemName').value = item.itemName;
        document.getElementById('updateCategory').value = item.category;
        document.getElementById('updateQuantity').value = item.quantity.toString();
        document.getElementById('updatePrice').value = item.price.toString();
        document.getElementById('updateSupplierName').value = item.supplierName;
        document.getElementById('updateStockStatus').value = item.stockStatus;
        document.getElementById('updatePopularItem').value = item.popularItem;
        document.getElementById('updateComment').value = item.comment || '';
        this.showMessage('Item loaded successfully', 'success');
    }
    // Handle updating an item
    handleUpdateItem() {
        const itemName = document.getElementById('updateSearchName').value.trim();
        const updatedData = {
            itemId: document.getElementById('updateItemId').value.trim(),
            itemName: document.getElementById('updateItemName').value.trim(),
            category: document.getElementById('updateCategory').value,
            quantity: parseInt(document.getElementById('updateQuantity').value),
            price: parseFloat(document.getElementById('updatePrice').value),
            supplierName: document.getElementById('updateSupplierName').value.trim(),
            stockStatus: document.getElementById('updateStockStatus').value,
            popularItem: document.getElementById('updatePopularItem').value,
            comment: document.getElementById('updateComment').value.trim() || undefined
        };
        const result = this.manager.updateItem(itemName, updatedData);
        this.showMessage(result.message, result.success ? 'success' : 'error');
        if (result.success) {
            document.getElementById('updateItemForm').reset();
            document.getElementById('updateSearchName').value = '';
            this.displayAllItems();
        }
    }
    // Handle search
    handleSearch() {
        const searchTerm = document.getElementById('searchTerm').value.trim();
        if (!searchTerm) {
            this.showMessage('Please enter a search term', 'error');
            return;
        }
        const results = this.manager.searchByName(searchTerm);
        this.displayItems(results, `Search Results for "${searchTerm}"`);
    }
    // Handle delete initiation
    handleDelete() {
        const itemName = document.getElementById('deleteItemName').value.trim();
        if (!itemName) {
            this.showMessage('Please enter an item name to delete', 'error');
            return;
        }
        const result = this.manager.deleteItem(itemName, false);
        if (result.requiresConfirmation) {
            this.pendingDelete = itemName;
            document.getElementById('deleteConfirmation').style.display = 'block';
            document.getElementById('confirmationMessage').innerHTML = result.message;
        }
        else {
            this.showMessage(result.message, 'error');
        }
    }
    // Confirm delete
    confirmDelete() {
        if (this.pendingDelete) {
            const result = this.manager.deleteItem(this.pendingDelete, true);
            this.showMessage(result.message, result.success ? 'success' : 'error');
            if (result.success) {
                document.getElementById('deleteItemName').value = '';
                this.displayAllItems();
            }
            this.cancelDelete();
        }
    }
    // Cancel delete
    cancelDelete() {
        this.pendingDelete = null;
        document.getElementById('deleteConfirmation').style.display = 'none';
        document.getElementById('confirmationMessage').innerHTML = '';
    }
    // Display all items
    displayAllItems() {
        const items = this.manager.getAllItems();
        this.displayItems(items, 'All Items');
    }
    // Display popular items
    displayPopularItems() {
        const items = this.manager.getPopularItems();
        this.displayItems(items, 'Popular Items');
    }
    // Generic method to display items
    displayItems(items, title) {
        const displayArea = document.getElementById('displayArea');
        if (!displayArea)
            return;
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
    showMessage(message, type) {
        const messageArea = document.getElementById('messageArea');
        if (!messageArea)
            return;
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
