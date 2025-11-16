/**
 * Author: Student Name
 * Assignment: PROG2005 Assessment 2 - Part 2
 * Description: Home page component
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalItems = 0;
  popularItemsCount = 0;
  lowStockCount = 0;
  outOfStockCount = 0;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.updateStatistics();
    this.inventoryService.inventory$.subscribe(() => {
      this.updateStatistics();
    });
  }

  private updateStatistics(): void {
    const items = this.inventoryService.getAllItems();
    this.totalItems = items.length;
    this.popularItemsCount = items.filter(item => item.popularItem === 'Yes').length;
    this.lowStockCount = items.filter(item => item.stockStatus === 'Low Stock').length;
    this.outOfStockCount = items.filter(item => item.stockStatus === 'Out of Stock').length;
  }
}
