/**
 * Author: Student Name
 * Assignment: PROG2005 Assessment 2 - Part 2
 * Description: Help page with FAQs and troubleshooting guidance
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FAQ {
  question: string;
  answer: string;
  expanded?: boolean;
}

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {
  faqs: FAQ[] = [
    {
      question: 'How do I add a new item to the inventory?',
      answer: 'Navigate to the "Manage Items" page and click on the "Add Item" tab. Fill in all required fields marked with an asterisk (*), including Item ID, Item Name, Category, Quantity, Price, Supplier Name, Stock Status, and Popular Item status. The Comment field is optional. Click the "Add Item" button to save the new item.',
      expanded: false
    },
    {
      question: 'How do I update an existing item?',
      answer: 'Go to the "Manage Items" page and select the "Update Item" tab. Enter the exact name of the item you want to update in the search field and click "Load Item". The form will populate with the current item details. Make your changes and click "Update Item" to save.',
      expanded: false
    },
    {
      question: 'How do I delete an item?',
      answer: 'Navigate to the "Manage Items" page and select the "Delete Item" tab. Enter the name of the item you want to delete and click the "Delete" button. A confirmation dialog will appear to prevent accidental deletions. Click "Yes, Delete" to confirm or "Cancel" to abort the operation.',
      expanded: false
    },
    {
      question: 'How do I search for items?',
      answer: 'Go to the "Search" page and enter the item name or part of the name in the search field. Click the "Search" button or press Enter. The system will display all items that match your search term. Use the "Clear" button to reset the search.',
      expanded: false
    },
    {
      question: 'What does each stock status mean?',
      answer: '"In Stock" means the item is available with adequate quantity. "Low Stock" indicates the quantity is running low and may need reordering soon. "Out of Stock" means the item is currently unavailable (quantity is zero).',
      expanded: false
    },
    {
      question: 'What are Popular Items?',
      answer: 'Popular Items are products that are frequently purchased or high-demand items in your inventory. Marking items as popular helps you quickly identify best-sellers and prioritize stock management for these products.',
      expanded: false
    },
    {
      question: 'Can I have duplicate Item IDs?',
      answer: 'No, Item IDs must be unique across all inventory items. This ensures each item can be uniquely identified in the system. If you try to add an item with an existing ID, you will receive an error message.',
      expanded: false
    },
    {
      question: 'Is my data saved automatically?',
      answer: 'The current version of this application stores data in browser memory for the duration of your session. Data will be lost when you close the browser or refresh the page. In a production environment, data would be persisted to a database for permanent storage.',
      expanded: false
    },
    {
      question: 'What categories are available?',
      answer: 'The system supports five categories: Electronics, Furniture, Clothing, Tools, and Miscellaneous. Choose the category that best fits your item. If none of the specific categories apply, use Miscellaneous.',
      expanded: false
    },
    {
      question: 'Can I export my inventory data?',
      answer: 'The current version does not include export functionality. In a full production system, you would be able to export data to CSV, Excel, or PDF formats for reporting and backup purposes.',
      expanded: false
    }
  ];

  troubleshootingSteps = [
    {
      icon: '🔄',
      title: 'Item not appearing after adding',
      solution: 'Check that all required fields were filled correctly. Navigate to the "View Items" tab in the Manage Items page to verify the item was added successfully.'
    },
    {
      icon: '❌',
      title: 'Cannot update an item',
      solution: 'Ensure you are entering the exact item name (case-insensitive) in the search field. Click "Load Item" before attempting to update. Verify all required fields are filled.'
    },
    {
      icon: '🔍',
      title: 'Search returns no results',
      solution: 'Check your spelling and try searching with partial names. The search is case-insensitive but requires at least part of the item name to match exactly.'
    },
    {
      icon: '⚠️',
      title: 'Error message about duplicate Item ID',
      solution: 'Each item must have a unique Item ID. Try using a different ID or check existing items to see which IDs are already in use.'
    },
    {
      icon: '💾',
      title: 'Data disappeared after refresh',
      solution: 'This is expected behavior in the current version. Data is stored in session memory and will be lost on page refresh. Always complete your work in one session.'
    },
    {
      icon: '📱',
      title: 'Layout issues on mobile',
      solution: 'Try rotating your device or zooming out. The application is responsive but some features work better on larger screens. Consider using a tablet or desktop for complex operations.'
    }
  ];

  toggleFAQ(faq: FAQ): void {
    faq.expanded = !faq.expanded;
  }
}
